import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Button, Form, Container, Modal} from 'react-bootstrap';

import Entry from './single.entry.component';
import { response } from 'express';

const Entries = () => {
    return (
        <div>
            <Container>
        <Button onClick={() => setAddNewEntry(true)}>Track today's calorie's</Button>
            </Container>
            <Container>
        {entries != null && entries.map((entry, i) =>  (
            <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry = {setChangeEntry} />
        ))}
            </Container>
        </div>
    );
}

function AddSingleEntry(){
    setAddNewEntry()
    var url = "http://localhost:8000/entry/create"
    axios.post(url, {
        "ingredient": newEntry.ingredients,
        "dish": newEntry.dish,
        "fat": parseFloat(newEntry.fat),
        "calorie": newEntry.calorie,
        "protein": newEntry.protein,
        "macros": newEntry.macros
    }).then(response =>  {
        if(response.status == 200){
            setRefreshData(true)
        }
    })
}

function deteleSingleEntry(id){
    var url = "http://localhost:8000/entry/delete"
    axios.delete(url, {

    }).then(response => {
        if (response.status == 200){
            setRefreshData(true)
        }
    })
}