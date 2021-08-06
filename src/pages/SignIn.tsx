import React, { Component, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Box as MuiBox,
  Paper as MuiPaper,
  Typography,
} from "@material-ui/core";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaperBox = styled(MuiPaper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Paper = styled(MuiPaper)`
  display: flex  
  padding: 1rem 3rem;
  max-width: 85rem;
  // min-width: 85rem;
  `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "200px",
      display: "block",
      margin: "0 auto",
    },
    textField: {
      "& > *": {
        width: "100%",
      },
    },
    submitButton: {
      marginTop: "1rem",
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

interface SignInForm {
  email: string;
  password: string;
}

interface FormStatus {
  message: string;
  type: string;
}

interface FormStatusProps {
  [key: string]: FormStatus;
}

const formStatusProps: FormStatusProps = {
  success: {
    message: "Signed in successfully.",
    type: "success",
  },

  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

// SIGN IN BUTTON
class UserSignIn extends Component {
  signIn = () => {
    // CHANGE THE LOCAL-STORAGE
    localStorage.clear();
    // you can also like localStorage.removeItem('Token');
    window.location.href = "/home";
  };

  render() {
    return (
      <Button
        color="secondary"
        type="submit"
        variant="contained"
        // disabled={isSubmitting}
        onClick={this.signIn}
      >
        Sign In
      </Button>
    );
  }
}

const SignIn: React.FunctionComponent = () => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    type: "",
  });

  const signInUser = async (data: SignInForm, resetForm: Function) => {
    try {
      // API call integration will be here. Handle success and error response accordingly.
      if (data) {
        setFormStatus(formStatusProps.success);
        resetForm({});
      }
    } catch (error) {
      const response = error.response;
      if (response.data === "error" && response.status === 400) {
        setFormStatus(formStatusProps.duplicate);
      } else {
        setFormStatus(formStatusProps.error);
      }
    } finally {
      setDisplayFormStatus(true);
    }
  };

  console.log();

  return (
    <>
      <Box>
        <PaperBox>
          <Typography variant="h5">Sign In</Typography>
          <Paper>
            <Row>
              <div className={classes.root}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values: SignInForm, actions) => {
                    signInUser(values, actions.resetForm);
                    setTimeout(() => {
                      actions.setSubmitting(false);
                    }, 500);
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("Enter a valid email"),
                    password: Yup.string()
                      .matches(
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
                      )
                      .required("Enter correct password"),
                  })}
                >
                  {(props: FormikProps<SignInForm>) => {
                    const {
                      values,
                      touched,
                      errors,
                      handleBlur,
                      handleChange,
                      isSubmitting,
                    } = props;
                    return (
                      <Form>
                        <Grid container justify="space-around">
                          <Grid item className={classes.textField}>
                            {/* Email */}
                            <Grid item className={classes.textField}>
                              <TextField
                                name="email"
                                id="email"
                                label="Email"
                                value={values.email}
                                type="email"
                                variant="outlined"
                                helperText={
                                  errors.email && touched.email
                                    ? errors.email
                                    : "Enter email"
                                }
                                error={
                                  errors.email && touched.email ? true : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>

                            {/* Password */}
                            <Grid item className={classes.submitButton}>
                              <TextField
                                name="password"
                                id="password"
                                label="Password"
                                value={values.password}
                                type="password"
                                variant="outlined"
                                helperText={
                                  errors.password && touched.password
                                    ? ""
                                    : "Enter Password"
                                }
                                error={
                                  errors.password && touched.password
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            {/* <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              disabled={isSubmitting}
                            ></Button> */}
                            <UserSignIn />

                            <Link to="/auth/sign-up">Sign Up / Register</Link>
                            {displayFormStatus && (
                              <div className="formStatus">
                                {formStatus.type === "error" ? (
                                  <p className={classes.errorMessage}>
                                    {formStatus.message}
                                  </p>
                                ) : formStatus.type === "success" ? (
                                  <p className={classes.successMessage}>
                                    {formStatus.message}
                                  </p>
                                ) : null}
                              </div>
                            )}
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </Row>
          </Paper>
        </PaperBox>
      </Box>
    </>
  );
};

export default SignIn;
