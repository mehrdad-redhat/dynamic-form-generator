import {Card as EvergreenCard, Heading, majorScale, Pane} from "evergreen-ui";
import React from "react";
import styled from "@emotion/styled";
import {Swatch} from "../theme";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import Edit from "../components/Edit";
import {Preview} from "../components/Preview";
import {PageStateContextProvider} from "../contexts/page.context";
import {PageService} from "../services/page.service";
import {Page as PageType} from "../models"

const Container = styled(Pane)`
  display: flex;
  height: 100%;
  width: 100%;
`

const CardWrapper = styled(Pane)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${majorScale(4)}px;
  background-color: ${Swatch.background};

  &#edit {
    width: 60%;
  }

  &#preview {
    width: 40%;
  }
`

const Card = styled(EvergreenCard)`
  display: flex;
  flex-direction: column;
  background-color: ${Swatch.cardBackground};
  width: 100%;
  height: 100%;
  padding: ${majorScale(4)}px;
  border-radius: 8px;
`

export const useSinglePageQuery = () => {
	const {pageId} = useParams();
	return useQuery(
		['currentPage', pageId],
		() => PageService.getSinglePage(pageId),
	)
};

export const usePageEditMutation = () => {
	const queryClient = useQueryClient();
	const {pageId} = useParams();
	return useMutation(
		{
			mutationFn: (edittedPage: PageType) => PageService.editPage(pageId, {...edittedPage}),
			onMutate: async (newPage) => {
				// Optimistically update to the new value
				let newPageData: PageType = {
					name: newPage.name,
					_id: pageId,
					elements: newPage.elements
				}
				queryClient.setQueryData(['currentPage', pageId], newPageData)
				return {}
			},
			onSuccess: (page) => {
				queryClient.invalidateQueries(['pages']).then();
				queryClient.invalidateQueries({
					queryKey: ['currentPage', page._id],
				}).then();
			}
		}
	)

}


const Page: React.FC = () => {
	const {isLoading, data: page} = useSinglePageQuery();

	const formRef = React.useRef<HTMLFormElement>(null);

	return (
		<PageStateContextProvider>
			<Container>
				<CardWrapper id='edit' paddingRight='16px !important'>
					<Card elevation={2}>
						<Heading size={600}
						         is='h3'
						         style={{display: 'flex', columnGap: '11px'}}
						         borderBottom='1px solid #a3a3a3'
						         marginBottom={majorScale(3)}
						         paddingBottom={majorScale(3)}>Edit
							<p style={{lineHeight:"1rem",fontSize: '11px', fontStyle: 'italic', fontWeight: '300', color: 'gray'}}>
								(click on element boxes to scroll the preview)<br/>
								(press enter to apply your changes)
							</p>
						</Heading>
						{page && <Edit formRef={formRef}/>}
					</Card>
				</CardWrapper>
				<CardWrapper id='preview' paddingLeft='16px !important'>
					<Card elevation={2}>
						<Heading size={600}
						         is='h3'
						         borderBottom='1px solid #a3a3a3'
						         marginBottom={majorScale(3)}
						         paddingBottom={majorScale(3)}>Preview</Heading>
						{page && <Preview ref={formRef}/>}
					</Card>
				</CardWrapper>
			</Container>
		</PageStateContextProvider>
	);
};

export default Page;
