import { ReactElement, useMemo } from 'react';
import { styled } from 'styled-components';

interface IProps {
    totalEntries: number;
    entriesPerPage: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}

export const TablePagination = (props: IProps): ReactElement => {
    const { totalEntries, entriesPerPage, setCurrentPage, currentPage } = props;
    const numberOfPages = useMemo(() => Math.ceil(totalEntries / entriesPerPage), [entriesPerPage, totalEntries]);

    const referenceArray = new Array(numberOfPages);
    referenceArray.fill(1);

    return (
        <PaginationContainer>
            {
                referenceArray.map((entry, index) => currentPage === index + 1 ? <ActivePage className='active-page' onClick={() => setCurrentPage(index + 1)} key={index}>{index + 1}</ActivePage> : <Page onClick={() => setCurrentPage(index + 1)} key={index}>{index + 1}</Page>)
            }
        </PaginationContainer>
    );
}

const PaginationContainer = styled.div`
position: fixed;
flex-wrap: wrap;
bottom: 10px;
right: 10%;
display: flex;
gap: 8px;
`;

const Page = styled.p`
    border: solid 1px #84cc16;
    padding: 3px 12px;
    cursor: pointer;
    border-radius: 2px;
    &:hover {
        background-color: #84cc16;
        font-weight: bold;
       };
`;

const ActivePage = styled.p`
    border: solid 1px #84cc16;
    padding: 3px 12px;
    cursor: pointer;
    border-radius: 2px;
    background-color: #84cc16;
    font-weight: bold;
`
