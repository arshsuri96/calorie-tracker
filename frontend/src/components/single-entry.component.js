import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import {Button, Card, Row, Col} from 'react-bootstrap';


const Entry = ({entryData, setChangeIngredient, deleteSingleEntry, setChangeEntry}) => {
    return(
        <card>
            <row>
                <Col>Dish: (entryData !== undefined && entryData.dish)</Col>
                <Col>Ingredient: (entryData !== undefined && entryData.ingredient)</Col>
                <Col>Calorie: (entryData !== undefined && entryData.calorie)</Col>
                <Col>Fat: (entryData !== undefined && entryData.fat)</Col>
                <Col>Protein: (entryData !== undefined && entryData.protein)</Col>
                <Col>Macros: (entryData !== undefined && entryData.macros)</Col>
                <Col><Button onClick={()=> deleteSingleEntry(entryData._id)}>delete entry</Button></Col>
                <Col><Button onClick={()=> ChangeIngredient()}>Change Ingredient</Button></Col>
                <Col><Button onClick={()=> ChangeEntry()}>Change Entry</Button></Col>
            </row>
        </card>
    )

    function ChangeIngredient(){
        setChangeIngredient(
            {
                "change" : true,
                "id" : entryData._id
            }
        )
    }
    function ChangeEntry(){
        setChangeEntry(
            {
                "change": true,
                "id": entryData._id
            }
        )
    }
}