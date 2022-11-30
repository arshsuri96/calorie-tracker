import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Button, Form, Container, Modal} from 'react-bootstrap';

import Entry from './single-entry.component';
import { response } from 'express';

const Entries = () => {


    const [entries, setEntries] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeEntry, setChangeEntry] = useState({"change": false, "id": 0})
    const [changeIngredient, setChangeIngredient] = useState({"change": false, "id": 0})
    const [newIngredientName, setNewIngredientName] = useState("")
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry, setNewEntry] = useState({"dish":"","ingredients":"", "calories":0, fat:0})

    useEffect(() => {
        getAllEntries();
    }, [])

    if(refreshData){
        setRefreshData(false);
        getAllEntries();
    }

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

            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Add Calorie Entry</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>dish</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.dish = event.target.value}}></Form.Control>
                    <Form.Label>fat</Form.Label>
                    <Form.Control type="number" onChange={(event)=> {newEntry.fat = event.target.value}}></Form.Control>
                    <Form.Label>ingredient</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.ingredients = event.target.value}}></Form.Control>
                    <Form.Label>calorie</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.calories = event.target.value}}></Form.Control>
                </Form.Group>
                <Button onClick={() => AddSingleEntry()}>Add</Button>
                <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
            </Modal.Body>
            </Modal>

            <Modal show={changeIngredient.change} onHide={() => setChangeIngredient({"change": false, "id": 0})} centered></Modal>
            <Modal.Header closeButton>
                <Modal.Title>Change Ingredients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>New Ingredients</Form.Label>
                    <Form.Control onChange={(event) => {setNewIngredientName(event.target.value)}}></Form.Control>
                </Form.Group>
                <Button onClick={() => changeIngredientForEntry()}>Change</Button>
                <Button onClick={()=> setChangeIngredient({"change": false, "id":0})}>Cancel</Button>
            </Modal.Body>

            <Modal show={changeEntry.change} onHide={() => setChangeEntry({"change": false, "id": 0})} centered></Modal>
            <Modal.Header closeButton>
                <Modal.Title>Change Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>dish</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.dish = event.target.value}}></Form.Control>
                    <Form.Label>ingredient</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.ingredients = event.target.value}}></Form.Control>
                    <Form.Label>fat</Form.Label>
                    <Form.Control type="number" onChange={(event)=> {newEntry.fat = event.target.value}}></Form.Control>
                    <Form.Label>calorie</Form.Label>
                    <Form.Control onChange={(event)=> {newEntry.calories = event.target.value}}></Form.Control>
                </Form.Group>
                <Button onClick={() => changeSingleEntry()}>Change</Button>
                <Button onClick={()=> setChangeEntry({"change": false, "id":0})}>Cancel</Button>
            </Modal.Body>
        </div>
    );


    function changeIngredientForEntry(){
        changeEntry.change = false;
        var url ="http://localhost:8000/entry/ingredient/update" + changeIngredient.id
        axios.put(url, {
            "ingredients" : newIngredientName
        }).then(response => {
            console.log(response.status)
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }
    function changeSingleEntry(){
        changeEntry.change = false;
        var url = "http://localhost:8000/entry/update" + changeEntry.id
        axios.put(url, newEntry)
        .then(response =>  {
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }
    


    function AddSingleEntry(){
        setAddNewEntry()
        var url = "http://localhost:8000/entry/create"
        axios.post(url, {
            "ingredient": newEntry.ingredients,
            "dish": newEntry.dish,
            "fat": parseFloat(newEntry.fat),
            "calorie": newEntry.calories
        }).then(response =>  {
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function deleteSingleEntry(id){
        var url = "http://localhost:8000/entry/delete"
        axios.delete(url, {
    
        }).then(response => {
            if (response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function getAllEntries(){
        var url ="http://localhost:8000/entries"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status == 200){
                setEntries(response.data)
            }
        })
    }

}

export default Entries