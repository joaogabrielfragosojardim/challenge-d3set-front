import {
  Flex,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Box,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createPessoa, ICreatePessoa } from "../services/pessoa";
import { convertBRDateToDate } from "../utils/convertBRDateToDate";

interface FormValues {
  name: string;
  birthday: string;
  phoneQuantity: number;
}

export const Create = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({
    name: "",
    birthday: "",
    phoneQuantity: 0,
  });

  const { isLoading, mutateAsync } = useMutation((data: ICreatePessoa) =>
    createPessoa(data)
  );

  const [phones, setPhones] = useState<string[]>([""]);

  const addPhone = () => {
    setPhones([...phones, ""]);
  };

  const handleChangeTelephone = (event: any, index: number) => {
    phones[index] = event.target.value;

    setPhones([...phones]);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const birthday = convertBRDateToDate(values.birthday);

    const data = {
      ...values,
      birthday,
      phoneQuantity: phones.length,
      phones,
    };

    await mutateAsync(data);

    setValues({
      name: "",
      birthday: "",
      phoneQuantity: 0,
    });
    setPhones([""]);
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
          Cadastro
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
              onChange={(event) =>
                setValues((prevState) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Data de nascimento:</FormLabel>
            <DatePicker
              color="white"
              placeholder="Data de nascimento"
              name="birthday"
              onChange={(date) =>
                setValues((prevState) => ({
                  ...prevState,
                  birthday: date,
                }))
              }
              dateFormat="DD/MM/YYYY"
            />
          </FormControl>

          <FormControl>
            <Flex justify="space-between" mb={2}>
              <FormLabel>Telefone(s):</FormLabel>
              <Button
                colorScheme="blue"
                size="small"
                px={2}
                onClick={addPhone}
                type="button"
              >
                Adicionar mais
              </Button>
            </Flex>
            <VStack spacing={4}>
              {phones.map((phone, index) => (
                <Input
                  key={index}
                  placeholder="(00) 9999-9999"
                  name={`telephone-${index + 1}`}
                  onChange={(event) => handleChangeTelephone(event, index)}
                />
              ))}
            </VStack>
          </FormControl>

          <Button
            colorScheme="green"
            type="submit"
            w="100%"
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};
