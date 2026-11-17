import 'dotenv/config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { User } from '../models/user.model.js';
import { Equipment } from '../models/equipment.model.js';
import { Loan } from '../models/loan.model.js';

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Equipment.deleteMany();
    await Loan.deleteMany();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const memberPassword = await bcrypt.hash('member123', 10);

    const users = await User.create([
      { email: 'admin@test.com', password: adminPassword, role: 'admin' },
      { email: 'member@test.com', password: memberPassword, role: 'member' }
    ]);

    const [e1, e2, e3] = await Equipment.create([
      {
        assetTag: 'VID-001',
        name: 'Vidéoprojecteur',
        category: 'video',
        dailyLateFeeCents: 150,
        isArchived: false,
        checkoutCount: 0
      },
      {
        assetTag: 'AUD-001',
        name: 'Enceinte',
        category: 'audio',
        dailyLateFeeCents: 100,
        isArchived: false,
        checkoutCount: 0
      },
      {
        assetTag: 'VID-OLD',
        name: 'Ancien projecteur',
        category: 'video',
        dailyLateFeeCents: 50,
        isArchived: true,
        checkoutCount: 0
      }
    ]);

    const absentEquipmentId = new mongoose.Types.ObjectId();

    const loans = await Loan.create([
      {
        equipmentId: e1._id,
        status: 'returned',
        returnedAt: new Date('2026-10-01T10:00:00Z')
      },
      {
        equipmentId: e2._id,
        status: 'returned',
        returnedAt: new Date('2026-10-03T10:00:00Z')
      },
      {
        equipmentId: e1._id,
        status: 'ongoing',
        returnedAt: null
      },
      {
        equipmentId: e1._id,
        status: 'returned',
        returnedAt: new Date('2026-09-30T10:00:00Z')
      },
      {
        equipmentId: absentEquipmentId,
        status: 'returned',
        returnedAt: new Date('2026-10-02T10:00:00Z')
      }
    ]);

    console.log('Seed completed successfully');
    console.log('Users created:', users.length);
    console.log('Equipments created:', 3);
    console.log('Loans created:', loans.length);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
