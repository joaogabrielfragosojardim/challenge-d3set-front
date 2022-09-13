import { Flex, Avatar, FormLabel, Box, Text } from "@chakra-ui/react";

import { IData } from "../services/pessoa";

interface IFormPeople {
  dataPessoa: IData;
}

export const FormPerson = ({ dataPessoa }: IFormPeople) => {
  const textPhone = dataPessoa.phones.length > 1 ? "Telefones:" : "Telefone:";
  const textBirthday = new Date(dataPessoa.birthday).toLocaleDateString();

  return (
    <Flex flexDir="column" gap="25px" align="center">
      <Avatar src="" size="2xl" />
      <form>
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
        </Flex>
      </form>
    </Flex>
  );
};
