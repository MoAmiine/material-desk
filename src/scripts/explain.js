import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Loan } from '../models/loan.model.js';
import { Equipment } from '../models/equipment.model.js';

const runExplain = async () => {
  try {
    await connectDB();

    let eq = await Equipment.findOne();
    if (!eq) {
      eq = await Equipment.create({
        assetTag: 'EXP-001',
        name: 'Explain Equipment',
        category: 'informatique',
        dailyLateFeeCents: 100,
        isArchived: false,
        checkoutCount: 0
      });
    }

    const currentCount = await Loan.countDocuments();
    if (currentCount < 10000) {
      console.log('Generating 10 000 loans for explain benchmark...');
      const bulk = [];
      const statuses = ['returned', 'ongoing'];
      const baseDate = new Date('2026-09-01T00:00:00Z').getTime();

      for (let i = 0; i < 10000; i++) {
        const isReturned = statuses[i % 2] === 'returned';
        bulk.push({
          equipmentId: eq._id,
          status: isReturned ? 'returned' : 'ongoing',
          returnedAt: isReturned ? new Date(baseDate + (i % 60) * 86400000) : null
        });
      }

      await Loan.insertMany(bulk);
      console.log('10 000 loans inserted.');
    }

    try {
      await Loan.collection.dropIndex('status_1_returnedAt_-1');
    } catch {
      // Index did not exist yet
    }

    const query = { status: 'returned', returnedAt: { $gte: new Date('2026-10-01T00:00:00Z') } };
    const sort = { returnedAt: -1, _id: 1 };

    console.log('\n--- 1. EXPLAIN BEFORE INDEX ---');
    const explainBefore = await Loan.find(query).sort(sort).explain('executionStats');
    const statsBefore = explainBefore.executionStats;
    console.log('Stage:', statsBefore.executionStages.stage);
    console.log('Total Docs Examined:', statsBefore.totalDocsExamined);
    console.log('Execution Time (ms):', statsBefore.executionTimeMillis);

    console.log('\n--- Creating Index { status: 1, returnedAt: -1 } ---');
    await Loan.collection.createIndex({ status: 1, returnedAt: -1 });

    console.log('\n--- 2. EXPLAIN AFTER INDEX ---');
    const explainAfter = await Loan.find(query).sort(sort).explain('executionStats');
    const statsAfter = explainAfter.executionStats;
    console.log('Stage:', statsAfter.executionStages.stage || statsAfter.executionStages.inputStage?.stage);
    console.log('Total Docs Examined:', statsAfter.totalDocsExamined);
    console.log('Execution Time (ms):', statsAfter.executionTimeMillis);

    process.exit(0);
  } catch (error) {
    console.error('Explain script failed:', error);
    process.exit(1);
  }
};

runExplain();
