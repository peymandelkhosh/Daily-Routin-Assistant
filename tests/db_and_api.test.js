const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Set temporary test database path before loading the module
const testDbPath = path.join(__dirname, 'test_routine.db');
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}
process.env.DATABASE_PATH = testDbPath;

console.log('🧪 Starting Automated Tests for SyncRoutine Database Service...');

const dbService = require('../services/database');

async function runTests() {
  try {
    // Wait for DB initialization
    await new Promise(resolve => setTimeout(resolve, 500));

    // Test 1: User Registration
    console.log('⏳ Test 1: Registering a new user...');
    const user = await dbService.registerUser('testuser', 'password123');
    assert.ok(user.id, 'User registration should return a user ID');
    assert.strictEqual(user.username, 'testuser');
    console.log('✅ Test 1 Passed!');

    // Test 2: Add Activity
    console.log('⏳ Test 2: Adding a study activity...');
    const activity = await dbService.addActivity(user.id, {
      id: 'act_test_1',
      date: '2026-06-29',
      activity: 'Study',
      duration: 1.5,
      productivity: 8,
      notes: 'Read 5 pages of a book',
      startTime: '09:00',
      endTime: '10:30'
    });
    assert.strictEqual(activity.id, 'act_test_1');
    assert.strictEqual(activity.activity, 'Study');
    console.log('✅ Test 2 Passed!');

    // Test 3: Toggle Medals Manually
    console.log('⏳ Test 3: Toggling medals manually...');
    const medalAdd = await dbService.toggleMedal(user.id, '2026-06-29', 'exercise', 1);
    assert.strictEqual(medalAdd.completed, 1);
    assert.strictEqual(medalAdd.habitType, 'exercise');

    // Retrieve medals and verify
    let medals = await dbService.getMedals(user.id);
    assert.strictEqual(medals.length, 19, 'Should retrieve 18 seeded medals + 1 newly added medal');
    assert.ok(medals.some(m => m.habitType === 'exercise' && m.date === '2026-06-29'));
    console.log('✅ Test 3 Passed!');

    // Test 4: Disable Medal Manually
    console.log('⏳ Test 4: Disabling a medal manually...');
    const medalRemove = await dbService.toggleMedal(user.id, '2026-06-29', 'exercise', 0);
    assert.strictEqual(medalRemove.completed, 0);

    medals = await dbService.getMedals(user.id);
    assert.strictEqual(medals.length, 18, 'Medal list should return to 18 seeded medals after deleting');
    console.log('✅ Test 4 Passed!');

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! Database integrations are 100% functional.');
  } catch (err) {
    console.error('\n❌ Test Suite Failed:', err);
    process.exit(1);
  } finally {
    // Cleanup test database
    setTimeout(() => {
      try {
        if (fs.existsSync(testDbPath)) {
          fs.unlinkSync(testDbPath);
          console.log('🧹 Cleaned up test database.');
        }
      } catch (e) {
        console.error('Cleanup failed:', e);
      }
    }, 1000);
  }
}

runTests();
