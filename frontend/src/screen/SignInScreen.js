import { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRoutes } from "~/config/routePath";
import { Store } from "~/data/Store";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "~/data/actions/userActions";
import { loginApi } from "~/api";
import "~/styles/SignInScreen.scss";
import { getError } from "~/utils";

function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch, isLogged } = useContext(Store);
    const { user: userState } = state;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: USER_LOGIN_REQUEST });
        try {
            const response = await loginApi({ email, password });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });

            // navigate
            navigate(publicRoutes.home);
        } catch (error) {
            dispatch({ type: USER_LOGIN_FAIL, payload: getError(error) });
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
        <div className="sign-in">
            <Form className="text-center">
                <h1 className="fw-bold">Login</h1>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" onClick={handleSubmit}>
                    {userState.loading ? <Spinner animation="border" size="sm" variant="dark" /> : "Submit"}
                </Button>
                <Link to={publicRoutes.signUp} className="link-sign-up">
                    Sign Up here
                </Link>
            </Form>
        </div>
    );
}

export { SignInScreen };
