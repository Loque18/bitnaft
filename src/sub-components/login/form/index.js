import { useFormik } from 'formik';
import * as yup from 'yup';

const Form = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            password: yup.string().required(),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    return <form onSubmit={formik.handleSubmit}>asd</form>;
};

export default Form;
