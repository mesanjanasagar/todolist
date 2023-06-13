import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { STATUS } from "../utils/constants";
import { setTodoData, setUpdatedTodoData } from "../state/features/todo";
import { useSelector } from "react-redux";
const defaultValues = {
  id: "",
  title: "",
  description: "",
  status: STATUS.PENDING,
};
const TodoForm = ({ setFormOpen, initialValues }) => {
  const form = useForm({
    defaultValues: initialValues ? initialValues : defaultValues,
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const isAuth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    if (Boolean(isAuth)) {
      setFormOpen(false);
      const myNewInputData = {
        id: new Date().getTime().toString(),
        title: values.title,
        description: values.description,
        status: STATUS.PENDING,
      };
      if (!initialValues) {
        dispatch(setTodoData(myNewInputData));
      } else {
        dispatch(
          setUpdatedTodoData({ ...myNewInputData, id: initialValues.id })
        );
      }
    } else {
      alert("User is not loggedin");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} sx={{ width: { md: 600, xs: 250, sm: 400 } }}>
        <Typography sx={{ mt: -5 }} fontWeight={"bold"}>
          {!initialValues ? "Create Todo" : "Edit Todo"}
        </Typography>
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          {...register("description", { required: "Description is required" })}
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          rows={4}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              width: 100,
              color: "#B56AFF",
              borderColor: "#B56AFF",
              ":hover": {
                color: "#B56AFF",
                borderColor: "#B56AFF",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default TodoForm;
