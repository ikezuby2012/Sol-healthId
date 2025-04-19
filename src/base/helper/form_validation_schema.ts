import * as Yup from "yup";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const CreatePersonIdentitySchema = Yup.object().shape({
    firstName: Yup.string().required("Full Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    phoneNumber: Yup.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("phone number is Required"),
    DD: Yup.string().max(2, "DD must contain 2 characters eg. 11"),
    MM: Yup.string().max(2, "MM must contain 2 characters eg. Mar for 03"),
    YYYY:Yup.string().max(4)
});

export const BackUpCodeSchema = Yup.object().shape({
  backUpCode: Yup.string().min(6, "Backup code should contain at least 6 Characters")
});