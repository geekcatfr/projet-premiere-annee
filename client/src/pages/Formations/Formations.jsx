import React, { useEffect, useState } from "react";

export default function Formations() {
    const [error] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formations, setFormations] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/formations").then(res => res.json()).then(
            (result) => {
                console.log(result)
                setIsLoaded(true);
                setFormations(result.nom);
            }
        )
    }, [])
    return (
        <div>
            <FormationUnit name={formations} desc="Ceci est une formation d'eco" />
        </div>
    )
}

class FormationUnit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="formation-block">
                <h2>{this.props.name}</h2>
                <p>{this.props.desc}</p>
            </div>
        )
    }
}   