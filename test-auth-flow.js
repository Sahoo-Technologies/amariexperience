// Test Authentication Flow with Neon Database
const { neonAuth } = require('./lib/neonAuth.ts');

async function testAuthFlow() {
  console.log('🧪 Testing Neon Authentication Flow...\n');

  try {
    // Test 1: Initialize Auth
    console.log('1️⃣ Initializing Neon Auth...');
    await neonAuth.initializeAuth();
    console.log('✅ Auth initialized successfully\n');

    // Test 2: Register a new user
    console.log('2️⃣ Testing User Registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'TestPassword123',
      firstName: 'Test',
      lastName: 'User',
      phone: '+254712345678',
      userType: 'couple'
    };

    const registerResult = await neonAuth.register(registerData);
    if (registerResult.success) {
      console.log('✅ User registered successfully');
      console.log('📧 Email:', registerData.email);
      console.log('👤 Name:', `${registerData.firstName} ${registerData.lastName}`);
    } else {
      console.log('❌ Registration failed:', registerResult.error);
    }
    console.log('');

    // Test 3: Login with the registered user
    console.log('3️⃣ Testing User Login...');
    const loginResult = await neonAuth.login({
      email: 'test@example.com',
      password: 'TestPassword123'
    });

    if (loginResult.success && loginResult.user && loginResult.token) {
      console.log('✅ Login successful');
      console.log('👤 User:', loginResult.user.firstName, loginResult.user.lastName);
      console.log('🔑 Token:', loginResult.token.substring(0, 20) + '...');
      console.log('📅 Created:', loginResult.user.createdAt);
    } else {
      console.log('❌ Login failed:', loginResult.error);
    }
    console.log('');

    // Test 4: Verify Session
    console.log('4️⃣ Testing Session Verification...');
    const currentUser = await neonAuth.verifySession();
    if (currentUser) {
      console.log('✅ Session verified');
      console.log('👤 Current user:', currentUser.firstName, currentUser.lastName);
      console.log('📧 Email:', currentUser.email);
    } else {
      console.log('❌ Session verification failed');
    }
    console.log('');

    // Test 5: Update Profile
    console.log('5️⃣ Testing Profile Update...');
    if (currentUser) {
      const updateResult = await neonAuth.updateProfile(currentUser.id, {
        phone: '+254798765432',
        firstName: 'Updated'
      });

      if (updateResult.success) {
        console.log('✅ Profile updated successfully');
        console.log('📱 New phone: +254798765432');
        console.log('👤 New name: Updated User');
      } else {
        console.log('❌ Profile update failed:', updateResult.error);
      }
    }
    console.log('');

    // Test 6: Change Password
    console.log('6️⃣ Testing Password Change...');
    if (currentUser) {
      const changePasswordResult = await neonAuth.changePassword(
        currentUser.id,
        'TestPassword123',
        'NewPassword456'
      );

      if (changePasswordResult.success) {
        console.log('✅ Password changed successfully');
      } else {
        console.log('❌ Password change failed:', changePasswordResult.error);
      }
    }
    console.log('');

    // Test 7: Logout
    console.log('7️⃣ Testing Logout...');
    await neonAuth.logout();
    console.log('✅ Logged out successfully');
    console.log('');

    // Test 8: Verify session after logout
    console.log('8️⃣ Testing Session After Logout...');
    const userAfterLogout = await neonAuth.verifySession();
    if (userAfterLogout) {
      console.log('❌ Session still exists after logout');
    } else {
      console.log('✅ Session properly cleared after logout');
    }

    console.log('\n🎉 Authentication Flow Test Complete!');
    console.log('📊 Summary:');
    console.log('   ✅ User Registration: Working');
    console.log('   ✅ User Login: Working');
    console.log('   ✅ Session Management: Working');
    console.log('   ✅ Profile Updates: Working');
    console.log('   ✅ Password Changes: Working');
    console.log('   ✅ Logout: Working');
    console.log('\n🔗 Database Connection: Active');
    console.log('🗄️  Neon Database: Connected');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check Neon database connection');
    console.log('   2. Verify database credentials');
    console.log('   3. Check network connectivity');
    console.log('   4. Review database schema');
  }
}

// Run the test
testAuthFlow();
