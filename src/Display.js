import React from 'react'

const Display = (props) => {

    const {cookbooks} = props
    console.log(cookbooks)

    const loaded = () => {
        
        return (
            <div>
                {cookbooks.map((cookbook) => {
                    return (
                        <article key={cookbook._id}>
                            <h2>{cookbook.title}</h2>
                            <h2>{cookbook.yearPublished}</h2>
                            <button onClick={() => {props.selectCookbook(cookbook)
                                                    props.history.push("/edit")}}>Edit Cookbook</button>
                            <button onClick={() => {props.deleteCookbook(cookbook)}}>Delete a Cookbook</button>
                        </article>
                    )
                })}
            </div>
        )
    }
    const loading = <h1>Loading...</h1>
    return cookbooks.length > 0 ? loaded() : loading;
}

export default Display
