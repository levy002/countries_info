import { ReactElement } from 'react';
import styled from 'styled-components';


interface IProps {
    area: number;
    isOceania: boolean;
    isLessArea: boolean;
    setIsOceania: () => void;
    setIsLessArea: () => void;
}

export const Filters = (props: IProps): ReactElement => {

    const { area, isLessArea, isOceania, setIsLessArea, setIsOceania } = props;
    return (
        <FiltersContainer>
            <OptionContainer onClick={setIsOceania} title="All countries located in Oceania region">
                <Input name="region" type='checkbox' checked={isOceania} onChange={setIsOceania} />
                {
                    isOceania ? <SpanActive>In Oceania</SpanActive> : <Span>In Oceania</Span>
                }
            </OptionContainer>
            <OptionContainer onClick={setIsLessArea} title="All countries smaller than Lithuania by area">
                <Input name="area" type='checkbox' checked={isLessArea} onChange={setIsLessArea} />
                {
                    isLessArea ? <SpanActive>Area {'<'} Lithuania({area})</SpanActive> : <Span>Area {'<'} Lithuania({area})</Span>
                }
            </OptionContainer>
        </FiltersContainer>)
}

const FiltersContainer = styled.div`
    display: flex;
    justify-content: end;
    padding-bottom: 10px;
    gap: 20px;

`;

const SpanActive = styled.span`
 font-weight: bold;
 color: #3f6212;
 font-size: 1rem;
`

const Span = styled.span`
 font-weight: bold;
 color: #3f6212;
 opacity: 0.7;
 font-size: 1rem;
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Input = styled.input`
border: 1px solid red;
padding: 5px;
cursor: pointer;
`;