import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connectDB } from '../config/db.js';
import { User } from '../models/user.model.js';
import { Equipment } from '../models/equipment.model.js';

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Equipment.deleteMany();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const memberPassword = await bcrypt.hash('member123', 10);

    const users = await User.create([
      { email: 'admin@test.com', password: adminPassword, role: 'admin' },
      { email: 'member@test.com', password: memberPassword, role: 'member' }
    ]);

    const equipments = await Equipment.create([
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

    console.log('Seed completed successfully');
    console.log('Users created:', users.map(u => ({ email: u.email, role: u.role, id: u._id })));
    console.log('Equipments created:', equipments.map(e => ({ tag: e.assetTag, id: e._id })));

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();