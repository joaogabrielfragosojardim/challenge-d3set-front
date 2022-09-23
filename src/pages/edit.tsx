import {
  Flex,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { convertBRDateToDate } from "../utils/convertBRDateToDate";
import { editPessoa, getPessoaById, IData, IPhones } from "../services/pessoa";

export interface IPessoaData {
  name: string;
  birthday: string;
  id: string;
  phoneQuantity: number;
  phones: IPhones[];
}

export const Edit = () => {
  const navigate = useNavigate();
  const [dataPessoa, setDataPessoa] = useState<IPessoaData>();

  const params = useParams();
  const toast = useToast();

  const { isLoading } = useQuery(
    "pessoaById",
    () => getPessoaById(params?.id || ""),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: IPessoaData) => {
        const dataFormatted = {
          ...data,
          birthday: new Date(data.birthday).toLocaleDateString(),
        };
        setDataPessoa(dataFormatted);
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

  const { isLoading: isLoadingMutation, mutateAsync } = useMutation(
    (data: IData) => editPessoa(data)
  );

  if (isLoading || !dataPessoa) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const handleChangeTelephone = (event: any, index: number, id: string) => {
    dataPessoa.phones[index] = { id, phone: event.target.value };

    setDataPessoa({ ...dataPessoa, phones: [...dataPessoa.phones] });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const birthday = convertBRDateToDate(dataPessoa.birthday);

    const data = { ...dataPessoa, birthday };
    await mutateAsync(data);
  };

  return (
    <Box p={4} height="100vh" width="100vw">
      <Box>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/");
          }}
        >
          {"< Voltar"}
        </Button>
      </Box>
      <Flex align="center" justify="center" flexDirection="column" gap={6}>
        <Heading fontSize="2xl" color="white">
          Editar
        </Heading>
        <VStack
          spacing={6}
          as="form"
          maxWidth="600px"
          w="100%"
          onSubmit={onSubmit}
        >
          <FormControl>
            <FormLabel>Nome:</FormLabel>
            <Input
              placeholder="Nome"
              name="name"
              value={dataPessoa?.name}
              onChange={(event) =>
                setDataPessoa({
                  ...dataPessoa,
                  name: event.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Data de nascimento:</FormLabel>
            <DatePicker
              color="white"
              placeholder="Data de nascimento"
              name="birthday"
              value={dataPessoa?.birthday}
              onChange={(date) =>
                setDataPessoa({
                  ...dataPessoa,
                  birthday: date,
                })
              }
              dateFormat="DD/MM/YYYY"
            />
          </FormControl>

          <FormControl>
            <Flex justify="space-between" mb={2}>
              <FormLabel>Telefone(s):</FormLabel>
            </Flex>
            <VStack spacing={4}>
              {dataPessoa?.phones.map(({ id, phone }, index) => (
                <Input
                  key={id}
                  placeholder="(00) 9999-9999"
                  name={`telephone-${index + 1}`}
                  value={phone}
                  onChange={(event) => handleChangeTelephone(event, index, id)}
                />
              ))}
            </VStack>
          </FormControl>

          <Button
            colorScheme="green"
            type="submit"
            w="100%"
            isLoading={isLoadingMutation}
          >
            Cadastrar
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};
