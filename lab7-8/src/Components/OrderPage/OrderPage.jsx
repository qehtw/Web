import React from "react";
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loadCartFromLocalStorage, clearCart} from '../../redux/cartAction';
import './OrderPage.css';

const OrderPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

    const totalSum = () =>{
        return cartItems.reduce((total, item) => {
            return total + item.price * item.count;
        }, 0);
    };

    const initialValues = {
        name: "",
        Age: "",
        CartNumber: "",
        card_cvv: "",
        email: "",
        };

    const validationSchema = Yup.object({
        name: Yup.string()
        .required("Хочу знати хто ти")
        .min(3, "Я в шоці")
        .max(40000,"Май совість, не бреши мені")
        .matches(/^[А-ЯЁЇЄІҐ][а-яёїєіґ]+$/, "Тільки українські символи,Перша літера має бути великою"),
        Age: Yup.number()
        .required("Тобі що жалко?")
        .min(18, "Купи краще іграшки і йди вчи уроки")
        .max(80,"Діду треба слуховий апарат, а не продукти"),
        CartNumber: Yup.number()
        .required("Загадай від 1 до 9")
        .min(1, "Я промовчу")
        .max(9, "Я в шоці...."),
        card_cvv: Yup.number()
        .min(100, "Треба 3 циферки")
        .max(999,"Ну якщо в тебе більше ніж 3 то я буду здивуюся")
        .required("Та не скамимо ми тебе"),
        email :Yup.string()
        .required("А що ти хотів без цього ніяк")
        .email("Введіть правильну е-пошту")
        .matches(/\.[a-z]{2,}$/, "Після крапки має бути 2 символи")
    });

    const handleSubmit = (values) => {
        console.log(values); 
        dispatch(clearCart())
        navigate("/SuccessPage")
    };

    return (
        <div className="form-container">
        <h2 className="form-title">Форма для підтвердження покупки</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
            <Form>
                <div className="form-group">
                    <label htmlFor="name">Імʼя:</label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Age">Вік:</label>
                    <Field
                        type="text"
                        id="Age"
                        name="Age"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="Age"
                        component="div"
                        className="error-message"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="CartNumber">Загадай число:</label>
                    <Field
                        type="text"
                        id="CartNumber"
                        name="CartNumber"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="CartNumber"
                        component="div"
                        className="error-message"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="card_cvv">3 цифри ззаду карточки:</label>
                    <Field
                        type="number"
                        id="card_cvv"
                        name="card_cvv"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="card_cvv"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Е-пошта:</label>
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="purchase-total-sum">
                    Повна сума: ${totalSum()}
                </div>

                <button
                type="submit"
                className="submit-button"
                >
                Нарешті
                </button>
                <button
                 className="back-to-cart" 
                 onClick={() => navigate(-1)}
                 >
                 Go back
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
};

export default OrderPage;