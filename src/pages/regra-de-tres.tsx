import { Box, Button, Flex, Grid, GridItem, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import {BsChevronLeft} from 'react-icons/bs';
import { Header } from "../components/Header";


export default function RegraDeTres() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState('???');

  function calculate() {
    const x = (b * c) / a;

    setD(x.toFixed(2));
  }

  function limpar() {
    setA(0);
    setB(0);
    setC(0);
    setD('???');
  }

  return (
    <Flex flexDir="column" alignItems="center" width="100%" height="100%" justifyContent="center" padding="30px">
      <Header />
      <Flex width="870px" flexDir="column" height="328px" borderRadius="8px" background="gray.800" padding="30px">
        <Heading fontSize="20px" fontWeight="700">Cálculo de Regra de Três Simples</Heading>

        <Grid flex="1" templateColumns='repeat(2, 1fr)' gap={6} marginTop={4} alignItems="center" justifyItems="center">
          <GridItem w='100%' h='10'>
            <Text>Valor A</Text>
            <InputGroup>
              <Input
                placeholder='A'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%' h='10'>
            <Text>Valor B</Text>
            <InputGroup>
              <Input
                placeholder='B'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
              />
            </InputGroup>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Text>Valor C</Text>
            <InputGroup marginTop="10px">
              <Input
                placeholder='C'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
              />
            </InputGroup>
          </GridItem>
          <GridItem w='100%' h='10'>
            <Text>Corresponde a</Text>
            <InputGroup marginTop="10px">
              <Input
                placeholder='D'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={d}
              />
            </InputGroup>
          </GridItem>
        </Grid>

        <Flex width='100%' justifyContent="right" alignItems="center" marginTop="30px" >
          <HStack spacing={8}>
            <Button colorScheme='purple' size='lg' onClick={calculate}>Calcular</Button>
            <Button colorScheme='purple' variant='link' size='lg' onClick={limpar}>Limpar</Button>
          </HStack >
        </Flex>
      </Flex>
    </Flex>
  )
}