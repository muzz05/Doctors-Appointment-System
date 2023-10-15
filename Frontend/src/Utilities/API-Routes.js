// Host
export const host = "http://localhost:4000/api/v1";

// Users Routes
export const RegisterRoute = `${host}/user/register`;
export const LoginRoute = `${host}/user/login`;
export const GetUserRoute = `${host}/user/get-user`;
export const ApplyDoctorRoute = `${host}/user/apply-doctor`;
export const GetAllNotificationRoute = `${host}/user/get-all-notifications`;
export const DeleteAllNotificationRoute = `${host}/user/delete-all-notifications`;
export const GetAllApprovedDoctorsRoute = `${host}/user/get-all-approved-doctors`;
export const BookAppoinmentRoute = `${host}/user/book-appoinment`;
export const BookingAvailabilityRoute = `${host}/user/booking-availability`;
export const GetUserAppoinmnentsRoute = `${host}/user/user-appoinments`;

// Admin Routes
export const GetAllUsersRoute = `${host}/admin/get-all-users`;
export const GetAllDoctorsRoute = `${host}/admin/get-all-doctors`;
export const ChangeAccountStatusRoute = `${host}/admin/change-account-status`;
export const DeleteUserRoute = `${host}/admin/delete-user`;

// Doctor Routes
export const GetDoctorDataRoute = `${host}/doctor/get-doctor-info`;
export const UpdateDoctorDataRoute = `${host}/doctor/update-doctor-info`;
export const SingleDoctorDataRoute = `${host}/doctor/get-single-doc-info`;
export const GetDoctorAppoinmentsRoute = `${host}/doctor/doctor-appoinments`;
export const UpdateAppoinmentStatusRoute = `${host}/doctor/update-appoinment-status`;
