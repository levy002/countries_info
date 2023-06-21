import { ReactElement } from 'react';
import styled from 'styled-components';
import { ICountry } from '../../../features/countries/interfaces';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';


interface IProps {
    countries: ICountry[];
    sortAsc: () => void;
    sortDesc: () => void;
    descStatus: boolean;
}

export const CountriesTable = (props: IProps): ReactElement => {
    const { countries, sortDesc, sortAsc, descStatus } = props;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <NameHeader>
                            <span>Name</span>
                            <SortIconsContainer>
                                {
                                    descStatus ? <DescendingIconActive onClick={sortDesc} title="Descending (Z-A)" /> : <DescendingIcon onClick={sortDesc} title="Descending (Z-A)" />
                                }
                                {
                                    descStatus ? <AscendingIcon onClick={sortAsc} title="Ascending (A-Z)" /> : <AscendingIconActive onClick={sortAsc} title="Ascending (A-Z)" />
                                }
                            </SortIconsContainer>
                        </NameHeader>
                        <TableHeader>Region</TableHeader>
                        <TableHeader>Area</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        countries.map(country => (
                            <TableRow key={country.name}>
                                <TableData>{country.name}</TableData>
                                <TableData>{country.region}</TableData>
                                <TableData>{country.area}</TableData>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>)
}

const TableContainer = styled.div`
width: 100%;
`;

const Table = styled.table`
width: 100%;
border: 1px hidden;
border-collapse: collapse;
`;

const TableHead = styled.thead`
`;

const TableRow = styled.tr`
background-color: #84cc16;
padding: 10px;
`;

const TableBody = styled.tbody`
${TableRow}:nth-child(odd) {
    background-color: #a3e635;
}
`;

const TableHeader = styled.th`
background-color: #65a30d;
padding: 7px 15px;
font-size: 1.1rem;
text-align: start;
`;

const NameHeader = styled(TableHeader)`
    display: flex;
    justify-content: flex-start;
    gap: 30px;
`;

const TableData = styled.td`
padding: 7px 15px;
`;

const SortIconsContainer = styled.div`
`;

const DescendingIcon = styled(FaLongArrowAltDown)`;
    opacity: 0.1;
    cursor: pointer;
`;

const DescendingIconActive = styled(FaLongArrowAltDown)`;
color: #a3e635;
cursor: pointer;
`

const AscendingIcon = styled(FaLongArrowAltUp)`;
    opacity: 0.1;
    cursor: pointer;
`

const AscendingIconActive = styled(FaLongArrowAltUp)`;
  color: #a3e635;
  cursor: pointer;
`