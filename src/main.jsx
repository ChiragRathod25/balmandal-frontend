import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';

import {
  AddAchievement,
  EditAchievement,
  AlltAchievement,
  Achievement,
  AddTalent,
  EditTalent,
  AllTalent,
  Talent,
  AddParent,
  EditParent,
  AllParent,
  Parent,
  Home,
  Login,
  Register,
  Logout,
  AdminDashboard,
  UserData,
  UserProfile,
  AddEvent,
  EditEvent,
  AllEvent,
  Event,
  Notification,
  AddNotification,
  AllNotification,
  EditAttendance,
  Attendance,
  AddUnregisteredAttendance,
  UnregisteredAttendance,
  EditUnregisteredAttendance,
  AddPost,
  AllPost,
  EditPost,
  Post,
  UserPosts,
  PendingApproval,
  InstallApp,
  About,
  ForgetPassword,
  ResetPassword,
  AddRegisteredUser,
  BirthdayDetails,
  AllUsers,
  ManageUsers
} from './pages/index.js';
import { AuthLayout } from './components/index.js';

// main.js or main.jsx
if (!import.meta.hot) {
  window.addEventListener('vite:preloadError', (event) => {
    console.warn('Chunk load failed. Reloading page...');
    window.location.reload();
  });
}



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/app',
        element: <InstallApp />,
      },
      {
        path:'/about',
        element:(
        
            <About />
        )
      },
      {
        path:'/forgetPassword',
        element:(
            <ForgetPassword />
        )
      },
      {
        path:'/reset-password/:resetToken',
        element:(
            <ResetPassword />
        )
      },
      {
        path: '/logout',
        element:(
          <AuthLayout>
            <Logout />
          </AuthLayout>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthLayout>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: 'achievement',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AlltAchievement />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddAchievement />
              </AuthLayout>
            ),
          },
          {
            path: ':achievementId',
            element: (
              <AuthLayout>
                <Achievement />
              </AuthLayout>
            ),
          },
          {
            path: 'edit/:achievementId',
            element: (
              <AuthLayout>
                <EditAchievement />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: 'parent',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AllParent />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddParent />
              </AuthLayout>
            ),
          },
          {
            path: ':parentId',
            element: (
              <AuthLayout>
                <Parent />
              </AuthLayout>
            ),
          },
          {
            path: 'edit/:parentId',
            element: (
              <AuthLayout>
                <EditParent />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: 'talent',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AllTalent />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddTalent />
              </AuthLayout>
            ),
          },
          {
            path: ':talentId',
            element: (
              <AuthLayout>
                <Talent />
              </AuthLayout>
            ),
          },
          {
            path: 'edit/:talentId',
            element: (
              <AuthLayout>
                <EditTalent />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AdminDashboard />
              </AuthLayout>
            ),
          },
          {
            path: 'all-users',
            element: (
              <AuthLayout>
                <AllUsers />
              </AuthLayout>
            ),
          },
          {
            path: 'user/:userId',
            element: (
              <AuthLayout>
                <UserData />
              </AuthLayout>
            ),
          },
          {
            path: 'add-registered-user',
            element: (
              <AuthLayout>
                <AddRegisteredUser />
              </AuthLayout>
            ),
          },
          {
            path:'birthdays',
            element:(
              <AuthLayout>
                <BirthdayDetails />
              </AuthLayout>
            )
          },
          {
            path: 'manage-users',
            element: (
              <AuthLayout>
                <ManageUsers />
              </AuthLayout>
            ),

          }
        ],
      },
      {
        path: 'event',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AllEvent />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddEvent />
              </AuthLayout>
            ),
          },
          {
            path: ':eventId',
            element: (
              <AuthLayout>
                <Event />
              </AuthLayout>
            ),
          },
          {
            path: 'edit/:eventId',
            element: (
              <AuthLayout>
                <EditEvent />
              </AuthLayout>
            ),
          },
          {
            path: 'attendance',
            children: [
              {
                path: ':eventId',
                element: (
                  <AuthLayout>
                    <Attendance />
                  </AuthLayout>
                ),
              },
              {
                path: 'edit/:eventId',
                element: (
                  <AuthLayout>
                    <EditAttendance />
                  </AuthLayout>
                ),
              },
              {
                path: 'unregistered/add/:eventId',
                element: (
                  <AuthLayout>
                    <AddUnregisteredAttendance />
                  </AuthLayout>
                ),
              },
              {
                path: 'unregistered/:unregisteredAttendanceId',
                element: (
                  <AuthLayout>
                    <UnregisteredAttendance />
                  </AuthLayout>
                ),
              },
              {
                path: 'unregistered/edit/:unregisteredAttendanceId',
                element: (
                  <AuthLayout>
                    <EditUnregisteredAttendance />
                  </AuthLayout>
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AllNotification />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddNotification />
              </AuthLayout>
            ),
          },
          {
            path: ':notificationId',
            element: (
              <AuthLayout>
                <Notification />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: 'post',
        children: [
          {
            path: '',
            element: (
              <AuthLayout>
                <AllPost />
              </AuthLayout>
            ),
          },
          {
            path: 'add',
            element: (
              <AuthLayout>
                <AddPost />
              </AuthLayout>
            ),
          },
          {
            path: ':postId',
            element: (
              <AuthLayout>
                <Post />
              </AuthLayout>
            ),
          },
          {
            path: 'edit/:postId',
            element: (
              <AuthLayout>
                <EditPost />
              </AuthLayout>
            ),
          },
          {
            path: 'user',
            element: (
              <AuthLayout>
                <UserPosts />
              </AuthLayout>
            ),
          },
          {
            path: 'pending',
            element: (
              <AuthLayout>
                <PendingApproval />
              </AuthLayout>
            ),
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
