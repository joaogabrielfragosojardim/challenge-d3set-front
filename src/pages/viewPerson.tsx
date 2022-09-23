import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPessoaById, IData } from "../services/pessoa";
import { useState } from "react";
import { Flex, Spinner, Box, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FormPerson } from "../components/FormPerson";

export const ViewPerson = () => {
  const [dataPessoa, setDataPessoa] = useState<IData>();
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading } = useQuery(
    "pessoaById",
    () => getPessoaById(params?.id || ""),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: IData) => {
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

  if (isLoading || !dataPessoa) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p="20px">
      <Button
        colorScheme="blue"
        onClick={() => {
          navigate("/");
        }}
      >
        {"< Voltar"}
      </Button>
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        flexDir="column"
        gap="20px"
      >
        <FormPerson dataPessoa={dataPessoa} />
      </Flex>
    </Box>
  );
};
