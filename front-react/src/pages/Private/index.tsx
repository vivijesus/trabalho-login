import { Heading, LinkBox, LinkOverlay, Table } from "@chakra-ui/react";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Private = () => {
  const [userSistema, setSistema] = useState([]);
  const [userAdminView, setAdminView] = useState<any | null>();
  const [userTotal, setTotal] = useState([]);
  const auth = useContext(AuthContext);

  const getCandidatos = async () => {
    await auth
      .usuarioList()
      .then((res: any) => {
        setTotal(res.response.length);
        setAdminView(auth?.user?.controle);

        return setSistema(res.response);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  useEffect(() => {
    getCandidatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userAdminView === "on" ? (
    <div className="tela">
      <Table.Root size="sm" width="60%" marginLeft="auto" marginRight="auto">
        <Table.Caption className="total">
          Total de {userTotal} pessoas cadastradas
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Usuário</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userSistema.map((item: any, index: any) => (
            <Table.Row key={index}>
              <Table.Cell key={index}>{item.id_usuario}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ) : (
    <div className="tela">
      <LinkBox
        as="article"
        p="5"
        borderWidth="1px"
        rounded="md"
        className="pagina"
      >
        <Heading size="md" my="2">
          <LinkOverlay>
            Usuário: <span className="campo">Este usuário não te acesso <strong>admin</strong> </span>
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </div>
  );
};
