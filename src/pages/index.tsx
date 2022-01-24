/* eslint-disable react/no-children-prop */
import { Button, Flex, Grid, GridItem, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Select, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { stringToReal } from "../utils";


interface DataProps {
  aporte: number;
  rentabilidade: string;
  imposto: string;
  rentabilidade_final: string;
  soma: string;
}

interface InfoProps {
  total_investido: string;
  total: string;
  total_rentabilidade: string;
}


export default function Home() {
  const [valorInicial, setValorInicial] = useState(0);
  const [valorMensal, setValorMensal] = useState(0);
  const [juros, setJuros] = useState(0);
  const [jurosType, setJurosType] = useState('mensal');
  const [periodo, setPeriodo] = useState(0);
  const [periodoType, setPeriodoType] = useState('mes');
  const [datas, setDatas] = useState<DataProps[]>([]);
  const [info, setInfo] = useState({} as InfoProps);


  const calcular = useCallback(() => {

    let newJuros = juros;
    let newPeriodo = periodo;

    if(jurosType === 'anual'){
      newJuros = juros / 12;
    }

    if (periodoType === 'ano') {
      newPeriodo = periodo * 12;
    }

    // para o calculo
    const jurosDoMes = newJuros / 100;

    let total_juros = 0;
    let total_acumulado = valorInicial;

    let result = [];

    // Para Tabela
    let total_rentabilidade = 0;
    let total_investido = 0;
    let somaTotal = 0;
    
    for (let i = 1; i <= newPeriodo; i++) {
      let juros_do_mes = 0;


      if (i === 1) {
        juros_do_mes = total_acumulado * jurosDoMes;
        total_juros = total_juros + juros_do_mes;
        total_acumulado = total_acumulado + (juros_do_mes - (juros_do_mes * (15 / 100))) + valorMensal;

      } else {
        juros_do_mes = total_acumulado * jurosDoMes;
        total_juros = total_juros + juros_do_mes;
        total_acumulado = total_acumulado + (juros_do_mes - (juros_do_mes * (15 / 100))) + valorMensal;
      }

      if(i === newPeriodo) {
        somaTotal = total_acumulado;
      }

      total_rentabilidade = total_rentabilidade + (juros_do_mes - (juros_do_mes * 15 / 100));
      

      result.push({
        aporte: valorMensal,
        rentabilidade: juros_do_mes.toFixed(2),
        imposto: (juros_do_mes * 15 / 100).toFixed(2),
        rentabilidade_final: (juros_do_mes - (juros_do_mes * 15 / 100)).toFixed(2),
        soma: total_acumulado.toFixed(2)
      });

      total_investido = i * valorMensal + valorMensal;


    }

    setDatas(result);


    setInfo({
      total_investido: total_investido.toFixed(2),
      total: somaTotal.toFixed(2),
      total_rentabilidade: total_rentabilidade.toFixed(2)
    })

  }, [valorInicial,
    valorMensal,
    juros,
    jurosType,
    periodo,
    periodoType]);

  const limpar = useCallback(() => {
    setValorInicial(0);
    setValorMensal(0);
    setJuros(0);
    setJurosType('anual');
    setPeriodo(0);
    setPeriodoType('ano');
    setDatas([]);
  }, []);

  const changePeriodo = useCallback(() => {
    if(periodoType === 'mes'){
      setPeriodoType('ano');
      setPeriodo(periodo/12);
    }else {
      setPeriodoType('mes');
      setPeriodo(periodo * 12);
    }
  }, [periodoType, periodo]);



  return (
    <Flex flexDir="column" alignItems="center" width="100%" height="100%" justifyContent="center" padding="30px">
      <Flex width="870px" flexDir="column" height="328px" borderRadius="8px" background="gray.800" padding="30px">
        <Heading fontSize="20px" fontWeight="700">Preencha os campos abaixo para simular o seu rendimento.</Heading>


        <Grid flex="1" templateColumns='repeat(2, 1fr)' gap={6} marginTop={4}>
          <GridItem w='100%' h='10'>
            <Text mb='8px'>Valor inicial</Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2rem'
                children='R$'
              />
              <Input
                placeholder='Valor inicial'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={valorInicial}
                onChange={(e) => setValorInicial(Number(e.target.value))}
              />
            </InputGroup>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Text mb='8px'>Valor mensal</Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2rem'
                children='R$'
              />
              <Input
                placeholder='Valor mensal'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={valorMensal}
                onChange={(e) => setValorMensal(Number(e.target.value))}
              />
            </InputGroup>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Text>Taxa de juros</Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2rem'
                children='%'
              />

              <Input
                placeholder='Taxa de juros'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={juros}
                onChange={(e) => setJuros(Number(e.target.value))}
              />

              <InputRightElement width='6.1rem'>
                <Select
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="purple.300"
                  iconColor="purple.300"
                  textColor="purple.300"
                  onChange={(e) => setJurosType(e.target.value)}
                >
                  <option value='mensal'>Mensal</option>
                  <option value='anual'>Anual</option>
                </Select>
              </InputRightElement>
            </InputGroup>
          </GridItem>

          <GridItem w='100%' h='10'>
            <Text>Período em</Text>
            <InputGroup>
              <Input
                placeholder='Período em'
                variant='filled'
                bgColor="gray.900"
                _hover={{ bgColor: "none" }}
                value={periodo}
                onChange={(e) => setPeriodo(Number(e.target.value))}
              />

              <InputRightElement width='6.1rem'>
                <Select
                  defaultChecked={true}
                  defaultValue={0}
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="purple.300"
                  iconColor="purple.300"
                  textColor="purple.300"
                  onChange={changePeriodo}
                >
                  <option value='mes'>Mês</option>
                  <option value='ano'>Anos</option>
                </Select>
              </InputRightElement>
            </InputGroup>
          </GridItem>
        </Grid>

        <Flex width='100%' justifyContent="right" alignItems="center" marginTop="10px" >
          <HStack spacing={8}>
            <Button colorScheme='purple' size='lg' onClick={calcular}>Calcular</Button>
            <Button colorScheme='purple' variant='link' size='lg' onClick={limpar}>Limpar</Button>
          </HStack >
        </Flex>
      </Flex>

      {datas.length > 0 && (
        <Flex marginTop="2rem">
          <Table variant='striped' colorScheme='blackAlpha' >
            <Thead>
              <Tr>
                <Th color="purple.400" textAlign="center">Mês</Th>
                <Th color="purple.400" textAlign="center">Aportes</Th>
                <Th color="purple.400" textAlign="center">Rentabilidade</Th>
                <Th color="purple.400" textAlign="center">Imposto Retido Lic(15%)</Th>
                <Th color="purple.400" textAlign="center">Rentabilidade Final</Th>
                <Th color="purple.400" textAlign="center">Soma</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td textAlign="center">Aplicação Inicial:</Td>
                <Td textAlign="center">{stringToReal(valorInicial)}</Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center"></Td>
                <Td textAlign="center"></Td>
              </Tr>
              {datas.map((data, index) => (
                <Tr key={index}>
                  <Td textAlign="center" alignItems="center">{index + 1}</Td>
                  <Td textAlign="center">{stringToReal(data.aporte)}</Td>
                  <Td textAlign="center">{stringToReal(data.rentabilidade)}</Td>
                  <Td textAlign="center" color="red.400">- {stringToReal(data.imposto)}</Td>
                  <Td textAlign="center">{stringToReal(data.rentabilidade_final)}</Td>
                  <Td textAlign="center">{stringToReal(data.soma)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total Rentabilidade: <Text color="green.400">{stringToReal(info.total_rentabilidade)}</Text></Th>
                <Th>Total Investido: <Text color="green.400">{stringToReal(info.total_investido)}</Text></Th>
                <Th>Total: <Text color="green.400">{stringToReal(info.total)}</Text></Th>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      )}


      {/* RESULTADO DA SIMULAÇÃO */}
    </Flex>
  )
}
