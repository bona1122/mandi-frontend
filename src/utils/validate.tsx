export const handleInputValidate = (
  name: "username" | "email",
  value: string
) => {
  let error = "";

  if (name === "username" && value.trim() === "") {
    error = "이름을 입력해주세요";
  }
  if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
    error = "이메일을 입력해주세요";
  }

  return error;
};


