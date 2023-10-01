import { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "~/api";
import { publicRoutes } from "~/config/routePath";

import "~/styles/SignUpScreen.scss";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "~/data/actions/userActions";
import { Store } from "~/data/Store";
import { getError } from "~/utils";
import { toast } from "react-toastify";

function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { state, dispatch, isLogged } = useContext(Store);
    const { user: userState } = state;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: USER_REGISTER_REQUEST });
        if (confirmPassword === password) {
            try {
                const response = await registerApi({ email, password });
                dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
                // navigate
                navigate(publicRoutes.home);
            } catch (error) {
                dispatch({ type: USER_REGISTER_FAIL, payload: getError(error) });
            }
        } else {
            dispatch({ type: USER_REGISTER_FAIL, payload: "Password not correct!" });
        }
    };

    useEffect(() => {
        if (isLogged) {
            navigate(publicRoutes.home);
            toast.warn("You must sign out current account!");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="sign-up">
            <Form className="text-center">
                <h1 className="fw-bold">Register</h1>
                <Form.Group>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        required
                    />
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <Form.Control
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm password"
                        required
                    />
                </Form.Group>

                <Button type="submit" onClick={handleSubmit}>
                    {userState.loading ? <Spinner animation="border" size="sm" variant="dark" /> : "Create account"}
                </Button>
                <Link to={publicRoutes.signIn} className="link-sign-in">
                    Sign in here
                </Link>
            </Form>
        </div>
    );
}

export { SignUpScreen };
