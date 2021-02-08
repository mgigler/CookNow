"use strict";

import React, {useEffect, useState} from 'react';
import CourseOverviewComponent from "../components/CourseOverview/CourseOverviewComponent";
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import SearchBar from "../components/CourseOverview/SearchBar";
import {CourseService} from "../services/CourseService";
import FilterBar from "../components/CourseOverview/FilterBar";

const useStyles = makeStyles((theme) => ({

    content: {
        padding: '30px 60px',
        maxWidth: '1800px',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            padding: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '16px',
            margin: '0',
        },
    },
    filterBar: {
        //height: '60px', /* 60px */
        //backgroundColor: 'darkgoldenrod',
        //margin: '5px 0',
    },
    dividerWrapper: {
        margin: '0 0',
    },
    courseContainer: {
        marginTop: '25px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(auto, 1fr))',
        gridGap: '40px',
        [theme.breakpoints.down('md')]: {
            gridGap: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            gridGap: '16px',
        },
    },
    nothingFound: {
        textAlign: "center",
        marginTop: "6rem",
    },
    h3: {
        fontSize: "3rem",
    },
    p: {
        fontSize: "2rem",
    }
}));

export default function CourseOverview() {
    const classes = useStyles();
    const [data, setData] = useState({courses: []});
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [date, setDate] = useState('');
    const [marks, setMarks] = useState();


    const onSearchChange = (s) => {
        setSearch(s);
    };

    const onCategoryChange = (e) => {
        setCategories(e);
    };

    const onPriceChange = (e) => {
        setPriceRange(e);
    };

    const onDateChange = (e) => {
        setDate(e);
    };

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const updateMarks = (v) => {
        let m = v.filter(onlyUnique);
        m = m.map(e => {
            return {value: e}
        });
        setMarks(m);
    };

    useEffect(
        () => {
            const fetchData = () => {
                CourseService.getCourses(search, priceRange, categories, date).then(res => {
                    setData({courses: res.data});
                    updateMarks(res.data.map(e => e.cost));
                }).catch(err => {
                    console.log(err);
                });

            }
            fetchData()
        },
        [search, priceRange, categories, date]
    );

    return (
        <div className={classes.content}>
            <SearchBar className="searchBar" onSearchChange={(s) => onSearchChange(s)}/>
            <FilterBar className={classes.filterBar} onCategoryChange={(e) => onCategoryChange(e)}
                       onPriceChange={(p) => onPriceChange(p)} onDateChange={(d) => onDateChange(d)} marks={marks}/>

            <div className={classes.dividerWrapper}>
                <Divider/></div>

            {data.courses.length === 0
                ?
                <div className={classes.nothingFound}><h3 className={classes.h3}>No courses found :(</h3><p
                    className={classes.p}>Please adjust the search.</p></div>
                : <div className={classes.courseContainer}><CourseOverviewComponent courses={data.courses}/></div>
            }
        </div>
    );
}