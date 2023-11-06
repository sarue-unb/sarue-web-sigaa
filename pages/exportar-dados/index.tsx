import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'
import { useShowReturnToHomePage } from '@/components/hooks/useShowReturnToHomePage'
import { Box, Typography, Button } from '@mui/material'
import { TextHeader } from '@/components/TextHeader/TextHeader'
import Link from 'next/link'

const ExportarDados = () => {
	const listItems = [
		'codigo',
		'titulo',
		'ano',
		'periodo_de_realizacao',
		'tipo',
		'situacao',
		'municipio_de_realizacao',
		'espaco_de_realizacao',
		'abrangencia',
		'publico_alvo',
		'unidade_proponente',
		'unidade_orcamentaria',
		'outras_unidades_envolvidas',
		'area_principal',
		'area_do_cnpq',
		'fonte_de_financiamento',
		'convenio_funpec',
		'renovacao',
		'numero_bolsas_solicitadas',
		'numero_bolsas_concedidas',
		'numero_discentes_envolvidos',
		'faz_parte_de_programa_de_extensao',
		'publico_estimado',
		'publico_real_atendido',
		'cadastro_tipo',
		'cadastro_categoria',
		'cadastro_subcategoria',
		'periodo_de_execucao',
		'carga_horaria',
		'previsao_n_de_vagas',
		'contato_coordenacao',
		'contato_email',
		'contato_telefone',
		'data_inicio',
		'objetivos',
		'membros_da_equipe',
		'carga_horario',
		'triagem',
		'grupo_permanente',
	]
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			height='100vh'
			maxWidth={'100%'}
			padding={'2em'}
		>
			<TextHeader text='Exportar dados para o excel' />
			<Typography maxWidth={'50%'} textAlign='start' fontSize='1rem'>
				Para baixar os dados brutos sobre todas as ações de extensão reunidas
				clique no botão abaixo.
			</Typography>
			<Typography maxWidth={'50%'} textAlign='start' fontSize='1rem'>
				O arquivo baixado será no formato ".xlsx", você pode importar ele em
				qualquer software de planilhas, como por exemplo Excel ou Google Sheets.
			</Typography>

			<Button
				variant='contained'
				color='primary'
				sx={{
					mt: 2,
					width: '300px',
					fontSize: '1em',
					borderRadius: '32px',
					marginBottom: '1em',
				}}
			>
				{/* Deve ser uma chamada para a API do servidor */}
				<Link href='/dados_brutos_acoes_extensao.xlsx'>
					Baixar dados brutos
				</Link>
			</Button>
		</Box>
	)
}
export default ExportarDados
