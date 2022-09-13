import {
  Flex,
  Avatar,
  Input,
  FormLabel,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { validatePhone } from "validations-br";
import { IData } from "../services/pessoa";

interface IFormPeople {
  dataPessoa: IData;
}

export const FormPerson = ({ dataPessoa }: IFormPeople) => {
  const textPhone = dataPessoa.phones.length > 1 ? "Telefones:" : "Telefone:";
  const textBirthday = new Date(dataPessoa.birthday).toLocaleDateString();
  const required = "Preencha este campo";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const onSubmit = useCallback((data: IData) => {
    console.log(data);
  }, []);

  return (
    <Flex flexDir="column" gap="25px" align="center">
      <Avatar src="" size="2xl" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="25px" flexDir="column">
          <Flex gap="45px" justify="space-between">
            <Box>
              <FormLabel>Nome:</FormLabel>
              <Text>{dataPessoa.name}</Text>
            </Box>
            <Box>
              <FormLabel>Aniversário:</FormLabel>
              <Text>{textBirthday}</Text>
            </Box>
          </Flex>
          {dataPessoa.phones.length ? (
            <>
              <Box>
                <FormLabel fontSize="medium">{textPhone}</FormLabel>

                {dataPessoa?.phones?.map((phone) => (
                  <Box key={phone.id}>
                    <Text mt="10px">{phone.phone}</Text>
                  </Box>
                ))}
              </Box>
            </>
          ) : null}
          <Button type="submit" bg="blue.300">
            Editar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
