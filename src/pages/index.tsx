import { useCallback, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getPessoa, getPessoaByQuantity, IData } from "../services/pessoa";
import { GrFormView, GrEdit } from "react-icons/gr";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Flex,
  Box,
  Spinner,
  Text,
  Select,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [dataPessoa, setDataPessoa] = useState<IData[]>([]);
  const [maxPhone, setMaxPhone] = useState<number[]>([]);

  const toast = useToast();
  const navigate = useNavigate();

  const { isLoading } = useQuery("pessoa", () => getPessoa(), {
    refetchOnWindowFocus: false,
    onSuccess: (data: IData[]) => {
      setDataPessoa(data);
      let maxPhoneQuantity = 1;

      data.forEach((item) => {
        if (item.phoneQuantity > maxPhoneQuantity) {
          maxPhoneQuantity = item.phoneQuantity;
        }
      });
      setMaxPhone(Array.from(Array(maxPhoneQuantity + 1).keys()));
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  });

  const useMutationPhoneQuantity = useMutation(
    "getPersonByPhoneQuantity",
    (value: number) => getPessoaByQuantity(value),
    {
      onSuccess: (data: IData[]) => {
        setDataPessoa(data);
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top-right",
          });
        }
      },
    }
  );
  const changePhoneQuantity = useCallback(
    (value: number) => {
      useMutationPhoneQuantity.mutate(value);
    },
    [useMutationPhoneQuantity]
  );

  if (isLoading) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p="20px">
      <Flex justifyContent="flex-end">
        <Button
          colorScheme="blue"
          bgColor="blue.700"
          color="white"
          onClick={() => navigate(`/cadastro`)}
        >
          Cadastro
        </Button>
      </Flex>
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        flexDir="column"
        gap="20px"
      >
        <Flex gap="20px" flexDir="column">
          <Flex w="100%" justify="space-between" align="center">
            <Text>Mínimo de telefones:</Text>
            <Box w="50%">
              <Select
                placeholder="Selecionar"
                onChange={(event) =>
                  changePhoneQuantity(parseInt(event.target.value))
                }
              >
                {maxPhone.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <TableContainer w="100%">
            <Table background="gray.100" variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Td>Nome</Td>
                  <Td>Data de Nascimento</Td>
                  <Td>Qntd. Telefone</Td>
                  <Td>Ações</Td>
                </Tr>
              </Thead>
              <Tbody>
                {dataPessoa.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{new Date(item.birthday).toLocaleDateString()}</Td>
                    <Td>{item.phoneQuantity}</Td>
                    <Td>
                      <Flex gap="10px">
                        <Button
                          bg="transparent"
                          onClick={() => navigate(`/pessoa/view/${item.id}`)}
                        >
                          <GrFormView />
                        </Button>
                        <Button
                          bg="transparent"
                          onClick={() => navigate(`/editar/${item.id}`)}
                        >
                          <GrEdit />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Box>
  );
};
