import React from 'react'
import '../style/singlepost.css'

export default function Singlepost() {
    return (
        <>
            <div className='singlepost'>
                <div className="singlepostContainer">
                    <img className='singlepostImg' src="https://forkast.news/wp-content/uploads/2023/03/Bitcoin-3-1260x840.jpg" alt="btc" />
                    <span className='singlepostTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                    <p className="singlepostDescription">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam odit mollitia asperiores! Cum animi, nesciunt delectus esse adipisci fugiat vero libero perferendis fugit quas? Autem amet fugit modi cupiditate ducimus!
                        Natus placeat inventore recusandae a mollitia aliquid eveniet libero veniam repellendus nostrum iusto quas reiciendis, incidunt perspiciatis laboriosam quod, amet aperiam cumque esse numquam culpa! Doloribus odit quos omnis illo.
                        Culpa quae laudantium error hic aut ad dignissimos adipisci quis, sequi, saepe libero quisquam. Consequatur voluptatum dolores velit, blanditiis voluptas suscipit? Voluptate doloremque consequuntur dolor illo ratione minima sed dolorum!
                        Incidunt officiis iusto iste accusamus nostrum quos reprehenderit vero est fugiat nihil laboriosam repellendus voluptas perferendis maxime aperiam rem, nobis et unde suscipit magnam repudiandae nam, corporis quae blanditiis? Est!
                        Voluptatum, consequuntur magni hic eius odit delectus. Distinctio ipsam quaerat in, maxime neque nulla facilis dicta recusandae blanditiis optio nam natus architecto iure dignissimos magni repellat dolorum atque beatae? Incidunt!</p>
                </div>
                <div className="singlepostManager">
                    <i className="  singlepostEditor fa-solid fa-pen-nib"></i>
                    <i className="singlepostEditor  fa-solid fa-trash"></i>
                </div>
                <div className="singlepostPublisher">
                    <span className="singlepostAuthor">Author: <strong>Chandan</strong></span>
                    <span className="singlepostTime">1hr ago</span>
                </div>
            </div>

        </>
    )
}
