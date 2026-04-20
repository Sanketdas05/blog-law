import User from '../models/User.js';

/**
 * Seeds a default admin/author account on server startup
 * if no author exists in the database.
 * Credentials are read from environment variables.
 */
const seedAdmin = async () => {
  try {
    const authorExists = await User.findOne({ role: 'author' });

    if (authorExists) {
      console.log(`ℹ️  Author account already exists: ${authorExists.email}`);
      return;
    }

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin Author',
      email: process.env.ADMIN_EMAIL || 'admin@thelawexplained.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'author',
    });

    console.log(`✅ Default author seeded: ${admin.email}`);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

export default seedAdmin;
