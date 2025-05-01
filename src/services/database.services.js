import axiosInstace from '../utils/axios.js';
import { handleApiRequest } from '../utils/apiHelper.js';
import toast from 'react-hot-toast';

export class DatabaseService {
  async register({ username, email, firstName, lastName, mobile, password }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/user/register', {
            firstName,
            lastName,
            mobile,
            password,
            username,
            email,
          }),
        'register'
      ),
      {
        loading: 'Registering',
        success: 'Registered successfully',
        error: 'Error while registering',
      },
      {
        id: 'register',
      }
    );
  }
  async login({ username, password }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/user/login', {
            username,
            password,
          }),
        'login'
      ),
      {
        loading: 'Logging in',
        success: 'Logged in',
        error: 'Error while logging in',
      },
      {
        id: 'login',
      }
    );
  }
  async updateUserDetails(
    { firstName, lastName, middleName, email, mobile, DOB, school, std, mediumOfStudy, address },
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/user/updateuserDetails?userId=${userId}`, {
              firstName,
              lastName,
              middleName,
              email,
              mobile,
              DOB,
              school,
              std,
              address,
              mediumOfStudy,
            }),
          'updateUserDetails'
        ),
        {
          loading: 'Updating',
          success: 'Updated successfully',
          error: 'Error while updating',
        },
        {
          id: 'updateUserDetails',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updateuserDetails', {
            firstName,
            lastName,
            middleName,
            email,
            mobile,
            DOB,
            school,
            address,
            std,
            mediumOfStudy,
          }),
        'updateUserDetails'
      ),
      {
        loading: 'Updating',
        success: 'Updated successfully',
        error: 'Error while updating',
      },
      {
        id: 'updateUserDetails',
      }
    );
  }
  async updateAvatar({ avatar }, userId = null) {
    const formData = new FormData();
    formData.append('avatar', avatar[0]);

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/user/updateAvatar?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'updateAvatar'
        ),
        {
          loading: 'Updating',
          success: 'Updated successfully',
          error: 'Error while updating',
        },
        {
          id: 'updateAvatar',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updateAvatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateAvatar'
      ),
      {
        loading: 'Updating',
        success: 'Updated successfully',
        error: 'Error while updating',
      },
      {
        id: 'updateAvatar',
      }
    );
  }
  async updatePassword({oldPassword, newPassword}) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put('/api/v1/user/updatePassword', {
            oldPassword,
            newPassword,
          }),
        'updatePassword'
      ),
      {
        loading: 'Updating Password',
        success: 'Password Updated successfully',
        error: 'Error while updating password',
      },
      {
        id: 'updatePassword',
      }
    );
  }

  async forgetPassword({ email, username }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/user/forgetPassword', {
            email,
            username,
          }),
        'forgetPassword'
      ),
      {
        loading: 'Sending Email',
        success: 'Reset Password Email Sent successfully to your email',
        error: 'Error while sending email',
      },
      {
        id: 'forgetPassword',
      }
    );
  }

  async resetPassword({ password }, resetToken) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/user/reset-password/${resetToken}`, {
            password,
          }),
        'resetPassword'
      ),
      {
        loading: 'Resetting Password',
        success: 'Password Reset successfully',
        error: 'Error while resetting password',
      },
      {
        id: 'resetPassword',
      }
    );
  }


  
  async getCurrentuser() {
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/user/getCurrentuser'),
      'getCurrentUser'
    );
  }
  async refreshAccessToken() {
    return handleApiRequest(
      () => axiosInstace.post('/api/v1/user/refreshAccessToken'),
      'refreshAccessToken'
    );
  }
  async logout() {
    //clear cookies

    return toast.promise(
      handleApiRequest(() => axiosInstace.post('/api/v1/user/logout'), 'logout'),
      {
        loading: 'Logging out',
        success: 'Logged out',
        error: 'Error while logging out',
      },
      {
        id: 'logout',
      }
    );
  }

  async deleteFile({ deleteUrl }, userId) {
    const config = {
      headers: { 'Content-Type': 'application/json' }, // Ensure JSON is sent
      data: { url: deleteUrl }, // Must be inside `data` for DELETE requests
    };

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/user/deleteFile?userId=${userId}`, config),
          'deleteFile'
        ),
        {
          loading: 'Deleting File',
          success: 'File Deleted successfully',
          error: 'Error while deleting file',
        },
        {
          id: 'deleteFile',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/user/deleteFile`, config), // Pass `data` in `config`
        'deleteFile'
      ),
      {
        loading: 'Deleting File',
        success: 'File Deleted successfully',
        error: 'Error while deleting file',
      },
      {
        id: 'deleteFile',
      }
    );
  }

  async getUserById(userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(() => axiosInstace.get(`/api/v1/admin/user/${userId}`), 'getUserById'),
        {
          loading: 'Getting User Details',
          success: 'User Details Fetched successfully',
          error: 'Error while fetching user',
        },
        {
          id: 'getUserById',
        }
      );
    }
  }

  async getUserAchievements(userId = null) {
    //if userId is passed then it will return all achievements of the user
    //and also check if the user is admin or not
    if (userId != null) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/achievement?userId=${userId}`),
        'getUserAchievements'
      );
    }

    //if userId is not passed then it will return all achievements of the logged in user
    return handleApiRequest(() => axiosInstace.get('/api/v1/achievement'), 'getUserAchievements');
  }

  async getAchievementById({ achievementId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/achievement/${achievementId}?userId=${userId}`),
        'getAchievementById'
      );
    }
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/achievement/${achievementId}`),
      'getAchievementById'
    );
  }

  async addAchievement({ title, description, image }, userId = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/achievement?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'addAchievement'
        ),
        {
          loading: 'Adding Achievement',
          success: 'Achievement Added successfully',
          error: 'Error while adding achievement',
        },
        {
          id: 'addAchievement',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/achievement', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addAchievement'
      ),
      {
        loading: 'Adding Achievement',
        success: 'Achievement Added successfully',
        error: 'Error while adding achievement',
      },
      {
        id: 'addAchievement',
      }
    );
  }

  async updateAchievement({ title, description, image, cloudFiles }, achievementId, userId = null) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    formData.append('cloudFiles', cloudFiles);

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(
              `/api/v1/admin/achievement/${achievementId}?userId=${userId}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            ),
          'updateAchievement'
        ),
        {
          loading: 'Updating Achievement',
          success: 'Achievement Updated successfully',
          error: 'Error while updating achievement',
        },
        {
          id: 'updateAchievement',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/achievement/${achievementId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateAchievement'
      ),
      {
        loading: 'Updating Achievement',
        success: 'Achievement Updated successfully',
        error: 'Error while updating achievement',
      },
      {
        id: 'updateAchievement',
      }
    );
  }
  async deleteAchievement({ achievementId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/achievement/${achievementId}?userId=${userId}`),
          'deleteAchievement'
        ),
        {
          loading: 'Deleting Achievement',
          success: 'Achievement Deleted successfully',
          error: 'Error while deleting achievement',
        },
        {
          id: 'deleteAchievement',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/achievement/${achievementId}`),
        'deleteAchievement'
      ),
      {
        loading: 'Deleting Achievement',
        success: 'Achievement Deleted successfully',
        error: 'Error while deleting achievement',
      },
      {
        id: 'deleteAchievement',
      }
    );
  }

  async getUserParents(userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/parent?userId=${userId}`),
        'getUserParents'
      );
    }
    return handleApiRequest(() => axiosInstace.get('/api/v1/parent'), 'getUserParents');
  }
  async addParentDetails(
    { role, fullName, email, mobileNumber, occupationType, occupationTitle, occupationAddress },
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/parent?userId=${userId}`, {
              role,
              fullName,
              email,
              mobileNumber,
              occupationType,
              occupationTitle,
              occupationAddress,
            }),
          'addParentDetails'
        ),
        {
          loading: 'Adding Parent',
          success: 'Parent Added successfully',
          error: 'Error while adding parent',
        },
        {
          id: 'addParentDetails',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/parent', {
            role,
            fullName,
            email,
            mobileNumber,
            occupationType,
            occupationTitle,
            occupationAddress,
          }),
        'addParentDetails'
      ),
      {
        loading: 'Adding Parent',
        success: 'Parent Added successfully',
        error: 'Error while adding parent',
      },
      {
        id: 'addParentDetails',
      }
    );
  }

  async updateParentDetails(
    { role, fullName, email, mobileNumber, occupationType, occupationTitle, occupationAddress },
    parentId,
    userId = null
  ) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/parent/${parentId}?userId=${userId}`, {
              role,
              fullName,
              email,
              mobileNumber,
              occupationType,
              occupationTitle,
              occupationAddress,
            }),
          'updateParentDetails'
        ),
        {
          loading: 'Updating Parent',
          success: 'Parent Updated successfully',
          error: 'Error while updating parent',
        },
        {
          id: 'updateParentDetails',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/parent/${parentId}`, {
            role,
            fullName,
            email,
            mobileNumber,
            occupationType,
            occupationTitle,
            occupationAddress,
          }),
        'updateParentDetails'
      ),
      {
        loading: 'Updating Parent',
        success: 'Parent Updated successfully',
        error: 'Error while updating parent',
      },
      {
        id: 'updateParentDetails',
      }
    );
  }

  async getParentDetailsById({ parentId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/parent/${parentId}?userId=${userId}`),
        'getParentDetailsById'
      );
    }

    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/parent/${parentId}`),
      'getParentDetailsById'
    );
  }
  async deleteParentDetails({ parentId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/parent/${parentId}?userId=${userId}`),
          'deleteParentDetails'
        ),
        {
          loading: 'Deleting Parent',
          success: 'Parent Deleted successfully',
          error: 'Error while deleting parent',
        },
        {
          id: 'deleteParentDetails',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/parent/${parentId}`),
        'deleteParentDetails'
      ),
      {
        loading: 'Deleting Parent',
        success: 'Parent Deleted successfully',
        error: 'Error while deleting parent',
      },
      {
        id: 'deleteParentDetails',
      }
    );
  }

  async getUserTalents(userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/talent?userId=${userId}`),
        'getUserTalents'
      );
    }

    return handleApiRequest(() => axiosInstace.get('/api/v1/talent'), 'getUserTalents');
  }
  async getTalentById({ talentId }, userId = null) {
    if (userId) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/talent/${talentId}?userId=${userId}`),
        'getTalentById'
      );
    }
    return handleApiRequest(() => axiosInstace.get(`/api/v1/talent/${talentId}`), 'getTalentById');
  }
  async addTalent({ heading, description, image, talentType }, userId = null) {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    formData.append('talentType', talentType);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.post(`/api/v1/admin/talent?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'addTalent'
        ),
        {
          loading: 'Adding Talent',
          success: 'Talent Added successfully',
          error: 'Error while adding talent',
        },
        {
          id: 'addTalent',
        }
      );
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/talent', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addTalent'
      ),
      {
        loading: 'Adding Talent',
        success: 'Talent Added successfully',
        error: 'Error while adding talent',
      },
      {
        id: 'addTalent',
      }
    );
  }
  async updateTalent(
    { heading, description, image, cloudFiles, talentType },
    talentId,
    userId = null
  ) {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    formData.append('talentType', talentType);
    if (image && image.length > 0) {
      Array.from(image).forEach((img) => formData.append('image', img));
    }
    formData.append('cloudFiles', cloudFiles);

    if (userId) {
      return toast.promise(
        handleApiRequest(
          () =>
            axiosInstace.put(`/api/v1/admin/talent/${talentId}?userId=${userId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }),
          'updateTalent'
        ),
        {
          loading: 'Updating Talent',
          success: 'Talent Updated successfully',
          error: 'Error while updating talent',
        },
        {
          id: 'updateTalent',
        }
      );
    }
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/talent/${talentId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateTalent'
      ),
      {
        loading: 'Updating Talent',
        success: 'Talent Updated successfully',
        error: 'Error while updating talent',
      },
      {
        id: 'updateTalent',
      }
    );
  }

  async deleteTalent({ talentId }, userId = null) {
    if (userId) {
      return toast.promise(
        handleApiRequest(
          () => axiosInstace.delete(`/api/v1/admin/talent/${talentId}?userId=${userId}`),
          'deleteTalent'
        ),
        {
          loading: 'Deleting Talent',
          success: 'Talent Deleted successfully',
          error: 'Error while deleting talent',
        },
        {
          id: 'deleteTalent',
        }
      );
    }
    return toast.promise(
      handleApiRequest(() => axiosInstace.delete(`/api/v1/talent/${talentId}`), 'deleteTalent'),
      {
        loading: 'Deleting Talent',
        success: 'Talent Deleted successfully',
        error: 'Error while deleting talent',
      },
      {
        id: 'deleteTalent',
      }
    );
  }

  async fetchAllActiveUsers() {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.get('/api/v1/admin/all-active-users'),
        'fetchAllActiveUsers'
      ),
      {
        loading: 'Fetching Users',
        success: 'All Users Fetched successfully',
        error: 'Error while fetching users',
      },
      {
        id: 'fetchAllActiveUsers',
      }
    );
  }

  async fetchAllUsers() {
    return toast.promise(
      handleApiRequest(() => axiosInstace.get('/api/v1/admin/all-users'), 'fetchAllUsers'),
      {
        loading: 'Fetching Users',
        success: 'All Users Fetched successfully',
        error: 'Error while fetching users',
      },
      {
        id: 'fetchAllUsers',
      }
    );
  }

  async getUserProfile(userId) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/user-profile/${userId}`),
        'getUserProfile'
      ),
      {
        loading: 'Fetching User',
        success: 'User Fetched successfully',
        error: 'Error while fetching user',
      },
      {
        id: 'getUserProfile',
      }
    );
  }

  async toggleActiveStatus(userId) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.put(`/api/v1/admin/toggle-active-status/${userId}`),
        'toggleActiveStatus'
      ),
      {
        loading: 'Updating User status',
        success: 'User status Updated successfully',
        error: 'Error while updating user status',
      },
      {
        id: 'toggleActiveStatus',
      }
    );
  }

  async updateUsername({ username }, userId) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/admin/update-user-username/${userId}`, {
            newUserName: username,
          }),
        'updateUsername'
      ),
      {
        loading: 'Updating username',
        success: 'Username Updated successfully',
        error: 'Error while updating username',
      },
      {
        id: 'updateUsername',
      }
    );
  }

  async updateUserPassword({ password }, userId) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.put(`/api/v1/admin/update-user-password/${userId}`, { password }),
        'updateUserPassword'
      ),
      {
        loading: 'Updating password',
        success: 'Password Updated successfully',
        error: 'Error while updating password',
      },
      {
        id: 'updateUserPassword',
      }
    );
  }

  async addEvent({
    title,
    description,
    media,
    cloudMediaFiles,
    startAt,
    endAt,
    venue,
    eventType,
    status,
  }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('status', status);
    if (media && media.length > 0) {
      Array.from(media).forEach((img) => formData.append('media', img));
    }
    formData.append('cloudMediaFiles', cloudMediaFiles);
    formData.append('startAt', startAt);
    formData.append('endAt', endAt);
    formData.append('eventType', eventType);
    formData.append('venue', venue);

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/event', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'addEvent'
      ),
      {
        loading: 'Adding Event',
        success: 'Event Added successfully',
        error: 'Error while adding event',
      },
      {
        id: 'addEvent',
      }
    );
  }
  async updateEvent(
    { title, description, media, cloudMediaFiles, eventType, startAt, endAt, venue, status },
    eventId
  ) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('eventType', eventType);
    formData.append('startAt', startAt);
    formData.append('endAt', endAt);
    formData.append('venue', venue);
    formData.append('status', status);

    if (media && media.length > 0) {
      Array.from(media).forEach((img) => formData.append('media', img));
    }
    formData.append('cloudMediaFiles', cloudMediaFiles);
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/event/${eventId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'updateEvent'
      ),
      {
        loading: 'Updating Event',
        success: 'Event Updated successfully',
        error: 'Error while updating event',
      },
      {
        id: 'updateEvent',
      }
    );
  }

  async deleteEvent({ eventId }) {
    return toast.promise(
      handleApiRequest(() => axiosInstace.delete(`/api/v1/event/${eventId}`), 'deleteEvent'),
      {
        loading: 'Deleting Event',
        success: 'Event Deleted successfully',
        error: 'Error while deleting event',
      },
      {
        id: 'deleteEvent',
      }
    );
  }
  async getEvents() {
    return handleApiRequest(() => axiosInstace.get('/api/v1/event'), 'getEvents');
  }
  async getEventById({ eventId }) {
    return handleApiRequest(() => axiosInstace.get(`/api/v1/event/${eventId}`), 'getEventById');
  }

  async getAllNotifications() {
    return handleApiRequest(() => axiosInstace.get('/api/v1/notification'), 'getAllNotifications');
  }

  async createNotification({
    createdFor,
    targetGroup,
    title,
    message,
    notificatinoType,
    poster,
    isReadBy,
    link,
    deliveredTo,
  }) {
    const formData = new FormData();
    formData.append('createdFor', createdFor);

    formData.append('targetGroup', targetGroup);
    formData.append('title', title);
    formData.append('link', link);

    formData.append('message', message);
    formData.append('notificatinoType', notificatinoType);
    formData.append('isReadBy', isReadBy);
    formData.append('deliveredTo', deliveredTo);
    if (poster && poster.length > 0) {
      Array.from(poster).forEach((img) => formData.append('poster', img));
    }

    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/admin/notification', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
        'createNotification'
      ),
      {
        loading: 'Creating Notification',
        success: 'Notification Created successfully',
        error: 'Error while creating notification',
      },
      {
        id: 'createNotification',
      }
    );
  }

  async getUserNotifications({ userId }) {
    if (userId != null) {
      return handleApiRequest(
        () => axiosInstace.get(`/api/v1/admin/notification/user?userId=${userId}`),
        'getUserNotifications'
      );
    }
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/notification/user'),
      'getUserNotifications'
    );
  }

  async getNotificationsByCreaterId() {
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/admin/notification/creater'),
      'getNotificationsByCreaterId'
    );
  }
  async getNotificationById({ notificationId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/notification/${notificationId}`),
      'getNotificationById'
    );
  }

  async markNotificationAsRead({ notificationId }) {
    return handleApiRequest(
      () => axiosInstace.put(`/api/v1/notification/markAsRead/${notificationId}`),
      'markNotificationAsRead'
    );
  }
  async markNotificationAsDelivered({ notificationId }) {
    return handleApiRequest(
      () => axiosInstace.put(`/api/v1/notification/markAsDelivered/${notificationId}`),
      'markNotificationAsDelivered'
    );
  }

  async createSubscription({ subscription }) {
    return handleApiRequest(
      () => axiosInstace.post(`/api/v1/subscription/add`, { subscription }),
      'createSubscription'
    );
  }

  async getSubscription({ endPoint }) {
    return handleApiRequest(
      () => axiosInstace.post(`/api/v1/subscription/checkRegistration`, { endPoint }),
      'getSubscription'
    );
  }

  // attendance
  // this addAttendance will be used by admin to add, update and delete attendance of the users
  async addAttendance({ attendanceList, eventId }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/attendance/${eventId}`, {
            attendanceList,
          }),
        'addAttendance'
      ),
      {
        loading: 'Marking Attendance',
        success: 'Attendance Marked successfully',
        error: 'Error while marking attendance',
      },
      {
        id: 'addAttendance',
      }
    );
  }
  async getAttendanceByEventId({ eventId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.get(`/api/v1/attendance/event/${eventId}`),
        'getAttendanceByEventId'
      ),
      {
        loading: 'Fetching Attendance',
        success: 'Attendance Fetched successfully',
        error: 'Error while fetching attendance',
      },
      {
        id: 'getAttendanceByEventId',
      }
    );
  }

  async getAttendanceByUserId({ userId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/attendance/user/${userId}`),
      'getAttendanceByUserId'
    );
  }
  async getAttendanceStatusByEventIdAndUserId({ eventId, userId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/attendance/status/${eventId}/${userId}`),
      'getAttendanceStatusByEventIdAndUserId'
    );
  }

  // unregistered attendance
  async addUnregisteredAttendance({ fullName, mobile, email, remark, status }, eventId) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/unregisteredAttendance/event/${eventId}`, {
            fullName,
            mobile,
            email,
            remark,
            status,
          }),
        'addUnregisteredAttendance'
      ),
      {
        loading: 'Adding Unregistered Attendance',
        success: 'Unregistered Attendance Added successfully',
        error: 'Error while adding unregistered attendance',
      },
      {
        id: 'addUnregisteredAttendance',
      }
    );
  }

  async updateUnregisteredAttendance(
    { fullName, mobile, email, remark, status },
    unregisteredAttendanceId
  ) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/unregisteredAttendance/${unregisteredAttendanceId}`, {
            fullName,
            mobile,
            email,
            remark,
            status,
          }),
        'updateUnregisteredAttendance'
      ),
      {
        loading: 'Updating Unregistered Attendance',
        success: 'Unregistered Attendance Updated successfully',
        error: 'Error while updating unregistered attendance',
      },
      {
        id: 'updateUnregisteredAttendance',
      }
    );
  }

  async deleteUnregisteredAttendance({ unregisteredAttendanceId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/unregisteredAttendance/${unregisteredAttendanceId}`),
        'deleteUnregisteredAttendance'
      ),
      {
        loading: 'Deleting Unregistered Attendance',
        success: 'Unregistered Attendance Deleted successfully',
        error: 'Error while deleting unregistered attendance',
      },
      {
        id: 'deleteUnregisteredAttendance',
      }
    );
  }
  async getUnregisteredAttendanceById({ unregisteredAttendanceId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/unregisteredAttendance/${unregisteredAttendanceId}`),
      'getUnregisteredAttendanceById'
    );
  }

  async getUnregisteredAttendanceByEventId({ eventId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/unregisteredAttendance/event/${eventId}`),
      'getUnregisteredAttendanceByEventId'
    );
  }

  //POST
  async addPost({ title, content, slug, status, tags, isCommentEnable }) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post('/api/v1/post', {
            title,
            content,
            slug,
            status,
            tags,
            isCommentEnable,
          }),
        'addPost'
      ),
      {
        loading: 'Adding Post',
        success: 'Post Added successfully',
        error: 'Error while adding post',
      },
      {
        id: 'addPost',
      }
    );
  }
  async updatePost({ title, content, slug, status, tags, isCommentEnable }, postId) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/post/${postId}`, {
            title,
            content,
            slug,
            status,
            tags,
            isCommentEnable,
          }),
        'updatePost'
      ),
      {
        loading: 'Updating Post',
        success: 'Post Updated successfully',
        error: 'Error while updating post',
      },
      {
        id: 'updatePost',
      }
    );
  }
  async deletePost({ postId }) {
    return toast.promise(
      handleApiRequest(() => axiosInstace.delete(`/api/v1/post/${postId}`), 'deletePost'),
      {
        loading: 'Deleting Post',
        success: 'Post Deleted successfully',
        error: 'Error while deleting post',
      },
      {
        id: 'deletePost',
      }
    );
  }
  async getPostById({ postId }) {
    return handleApiRequest(() => axiosInstace.get(`/api/v1/post/${postId}`), 'getPostById');
  }
  async getPosts() {
    return handleApiRequest(() => axiosInstace.get('/api/v1/post'), 'getPosts');
  }
  async getPostsByUserId({ userId }) {
    return handleApiRequest(
      () => axiosInstace.get(`/api/v1/post/user/${userId}`),
      'getPostsByUserId'
    );
  }
  async togglePublishStatus({ postId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.put(`/api/v1/post/${postId}/publish`),
        'togglePublishStatus'
      ),
      {
        loading: 'Toggling Publish Status',
        success: 'Publish Status Toggled successfully',
        error: 'Error while toggling publish status',
      },
      {
        id: 'togglePublishStatus',
      }
    );
  }
  async toggleIsCommentsEnabled({ postId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.put(`/api/v1/post/${postId}/comments`),
        'toggleIsCommentsEnabled'
      ),
      {
        loading: 'Toggling Comment Status',
        success: 'Comment Status Toggled successfully',
        error: 'Error while toggling comment status',
      },
      {
        id: 'toggleIsCommentsEnabled',
      }
    );
  }
  async toggleIsApproved({ postId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.put(`/api/v1/post/${postId}/approval`),
        'toggleIsApproved'
      ),
      {
        loading: 'Toggling Approval Status',
        success: 'Approval Status Toggled successfully',
        error: 'Error while toggling approval status',
      },
      {
        id: 'toggleIsApproved',
      }
    );
  }
  async getPendingPosts() {
    return handleApiRequest(
      () => axiosInstace.get('/api/v1/admin/pending-post'),
      'getPendingPosts'
    );
  }

  //Comment
  async addPostComment({ content }, postId) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.post(`/api/v1/comment/${postId}`, {
            content,
          }),
        'addPostComment'
      ),
      {
        loading: 'Adding Comment',
        success: 'Comment Added successfully',
        error: 'Error while adding comment',
      },
      {
        id: 'addPostComment',
      }
    );
  }

  async getCommentsByPostId({ postId }) {
    return handleApiRequest(() => axiosInstace.get(`/api/v1/comment/${postId}`), 'getPostComment');
  }
  async updatePostComment({ content }, commentId) {
    return toast.promise(
      handleApiRequest(
        () =>
          axiosInstace.put(`/api/v1/comment/${commentId}`, {
            content,
          }),
        'updatePostComment'
      ),
      {
        loading: 'Updating Comment',
        success: 'Comment Updated successfully',
        error: 'Error while updating comment',
      },
      {
        id: 'updatePostComment',
      }
    );
  }

  async deletePostComment({ commentId }) {
    return toast.promise(
      handleApiRequest(
        () => axiosInstace.delete(`/api/v1/comment/${commentId}`),
        'deletePostComment'
      ),
      {
        loading: 'Deleting Comment',
        success: 'Comment Deleted successfully',
        error: 'Error while deleting comment',
      },
      {
        id: 'deletePostComment',
      }
    );
  }

  //like
  // togglePostLike,
  // getLikesByPostId,
  async togglePostLike(postId) {
    return handleApiRequest(() => axiosInstace.post(`/api/v1/like/${postId}`), 'togglePostLike');
  }
  async getLikesByPostId(postId) {
    return handleApiRequest(() => axiosInstace.get(`/api/v1/like/${postId}`), 'getLikesByPostId');
  }

  // save logs
  async saveLogs({ level, message, timestamp }) {
    return handleApiRequest(
      () => axiosInstace.post('/api/v1/logs', { level, message, timestamp }),
      'saveLogs'
    );
  }
}

const databaseService = new DatabaseService();
export default databaseService;
