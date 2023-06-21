import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCountries,
  fetchCountries
} from './countriesSlice';
import { CountriesTable } from '../../components/shared/table/CountriesTable';
import { TablePagination } from '../../components/shared/table/Pagination';
import { ICountry } from './interfaces';
import { Filters } from '../../components/shared/table/Filters';

export function Countries(): ReactElement {
  const countries = useAppSelector(selectCountries);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [offset, setOffSet] = useState<number>(0);
  const [limit, setLimit] = useState<number>(entriesPerPage);
  const [totalEntries, setTotalEntries] = useState<number>(countries.length)
  const [isOceania, setIsOceania] = useState<boolean>(false);
  const [isLessArea, setIsLessArea] = useState<boolean>(false);
  const [descendingStatus, SetDescendingStatus] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  const lithuaniaArea = useMemo(() => {
    const lithuania = countries.find((country: ICountry) => country.name === 'Lithuania');
    return lithuania?.area || 0;
  }, [countries])

  useEffect(() => {
    const newOffset = (currentPage - 1) * entriesPerPage;
    const newLimit = newOffset + entriesPerPage;

    setLimit(newLimit);
    setOffSet(newOffset);
    let countriesToSlice = countries;
    if (isLessArea) {
      countriesToSlice = countries.filter((country: ICountry) => country.area < lithuaniaArea);
    }

    if (isOceania) {
      countriesToSlice = countriesToSlice.filter((country: ICountry) => country.region === 'Oceania');
    }
    setTotalEntries(countriesToSlice.length)
    setDisplayedCountries(countriesToSlice.slice(newOffset, newLimit))
  }, [currentPage, setCurrentPage, entriesPerPage, setEntriesPerPage, countries, isLessArea, lithuaniaArea, isOceania]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const [displayedCountries, setDisplayedCountries] = useState<ICountry[]>(countries.slice(offset, limit));


  const handleOceania = useCallback(() => {
    setIsOceania(!isOceania)
  }, [isOceania]);

  const handleLessArea = useCallback(() => {
    setIsLessArea(!isLessArea)
  }, [isLessArea])

  const sortDesc = useCallback(() => {
    const newCountries = [...displayedCountries];
    newCountries.sort((a, b) => {
      if (a.name < b.name) { return 1; }
      if (a.name > b.name) { return -1; }
      return 0;
    });
    SetDescendingStatus(true);
    setDisplayedCountries(newCountries);
  }, [displayedCountries]);

  const sortAsc = useCallback(() => {
    const newCountries = [...displayedCountries];
    newCountries.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    SetDescendingStatus(false);
    setDisplayedCountries(newCountries);
  }, [displayedCountries]);

  return (
    <Container>

      <MainHeader>COUNTRIES LIST</MainHeader>
      <Filters
        area={lithuaniaArea}
        isLessArea={isLessArea}
        isOceania={isOceania}
        setIsOceania={handleOceania}
        setIsLessArea={handleLessArea}
        entriesPerPage={entriesPerPage}
      />
      {
        countries.length === 0 ? <Loading>Loading...</Loading> : (
          <>
            {displayedCountries.length > 0 && <CountriesTable
              sortAsc={sortAsc}
              sortDesc={sortDesc}
              descStatus={descendingStatus}
              countries={displayedCountries} />}
            <TablePagination
              totalEntries={totalEntries}
              entriesPerPage={entriesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )
      }
    </Container>
  );
}


const Container = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: space-around;
 width: 80%;
 height: 100%;
 margin: 0 auto;
 gap: 15%;
 padding: 1rem 0 4rem;
 position: relative;
`;

const MainHeader = styled.h1`
 text-align: center;
 text-decoration: underline;
 color: #4d7c0f;
`

const Loading = styled.h2`
 text-align: center;
 color: #4d7c0f;
`