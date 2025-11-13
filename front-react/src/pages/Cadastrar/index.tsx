import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import "./index.css";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import type { User, UserForm } from "@/types/User";

export const Cadastrar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("O campo usuário é obrigatório")
      .max(40, "Informe no máximo 40 caracteres")
      .email("Informe formato usuário valido")
      .trim(),
    senha: Yup.string()
      .max(39, "Informe no máximo 40 caracteres")
      .required("O campo senha é obrigatório")
      .min(4, "Informe no mínimo 4 caracteres")
      .trim(),
    controle: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: User) => {
    const usuario = {
      email: form.email,
      senha: form.senha,
      controle: form.controle,
    };

    await auth
      .cadastroUser(usuario)
      .then((res: any) => {
        alert('Usuario cadastrado com sucesso')
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data.mensagem));
        console.log(error.response.data.mensagem);
      });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <VStack gap="8" className="conta">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Card.Root size="lg" width="420px">
            <Card.Header>
              <Card.Title>Acesso</Card.Title>
              <Card.Description>Cadastro usuário</Card.Description>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root>
                  <Field.Label>Usuário</Field.Label>
                  <Input {...register("email")} />
                  {errors.email ? (
                    <p className="text-dark cor">{errors.email.message}</p>
                  ) : (
                    ""
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Senha</Field.Label>
                  <Input type="password" {...register("senha")} />
                  {errors.senha ? (
                    <p className="text-dark cor">{errors.senha.message}</p>
                  ) : (
                    ""
                  )}
                </Field.Root>
              </Stack>
            </Card.Body>
            <Card.Body>
              <Switch.Root>
                <Switch.HiddenInput {...register("controle")} />
                <Switch.Control />
                <Switch.Label>Admin</Switch.Label>
              </Switch.Root>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" width="49%" onClick={goToLogin}>
                Voltar
              </Button>

              <Button variant="solid" width="49%" type="submit">
                Cadastrar
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </VStack>
    </>
  );
};
