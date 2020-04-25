import React from 'react';
import AddTeaForm from './AddTeaForm';
import TeaList from './TeaList';
import { v4 } from "uuid";

const masterTeaList = [
  {
    id: v4 (),
    name: "Dragonwell",
    type: "Green Tea",
    origin: "China",
    flavor: "Mellow, floral flavor with slightly sweet aftertaste",
    price: 10,
    amount: 42,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/7004-Dragonwell_House-1.jpg?v=1445269617",
  },
  {
    id: v4 (),
    name: "Ti Kwan Yin",
    type: "Oolong Tea",
    origin: "China",
    flavor: "Delicate, green, floral, sweet with mineral note",
    price: 8,
    amount: 54,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/Standard_Shot_Ti_Kwan_Yin.jpg?v=1548603635",
  },
  {
    id: v4 (),
    name: "Sheng Puer Pearls 2014",
    type: "Puer Tea",
    origin: "China",
    flavor: "Sweet peach and evergreen notes, smooth with decent body that gets better with age",
    price: 40,
    amount: 7,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/Standard_Shot_Ms._Zhao_s_Sheng_Puer_Pearl.jpg?v=1554923461",
  },
  {
    id: v4 (),
    name: "English Breakfast",
    type: "Black Tea Blend",
    origin: "Assam, Ceylon, Kenya",
    flavor: "Full bodied brew, strong and moderately caffeinated.",
    price: 12,
    amount: 35,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/9000-Decaf_English_Breakfast.jpg?v=1445269330",
  },
  {
    id: v4 (),
    name: "Yin Zhen",
    type: "White Tea",
    origin: "China",
    flavor: "Sweet, creamy, silky tea",
    price: 41,
    amount: 7,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/Standard_Shot_8501_2019_Silver_Needles-1.jpg?v=1571847096",
  },
  {
    id: v4 (),
    name: "Fu Cha",
    type: "Dark Tea Brick",
    origin: "China",
    flavor: "Sweet, mild, smooth, slight hint of fresh grass",
    price: 17,
    amount: 36,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/IG_posts_-_2020-01-10T105334.704.png?v=1578675295",
  },
  {
    id: v4 (),
    name: "Gyokuro",
    type: "Green Tea",
    origin: "Japan",
    flavor: "Sweet, seaweed-y, with brothy body",
    price: 28,
    amount: 18,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/7701-Gyokuro.jpg?v=1445451386",
  },
  {
    id: v4 (),
    name: "Darjeeling",
    type: "Black Tea",
    origin: "India",
    flavor: "Medium bodied, smooth, hints of muscatel, fresh taste with delicate nuances in flavor",
    price: 6,
    amount: 85,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/1000-TeaSource_Darjeeling-1.jpg?v=1446672895",
  },
  {
    id: v4 (),
    name: "Green Dragon",
    type: "Oolong Tea",
    origin: "Taiwan",
    flavor: "Silky, medium bodied, sweet and fruity notes, light lingering aftertaste",
    price: 11,
    amount: 56,
    image: "https://cdn.shopify.com/s/files/1/0888/8900/products/6405-Green_Dragon.jpg?v=1445450870",
  },
];

class TeaControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTeaList: masterTeaList,
      quantityChanged: false,
    };
  }

  handleToggleForms = () => {
    this.setState(prevState => ({formVisibleOnPage: !prevState.formVisibleOnPage}));
  }

  handleAddingTeaToList = (newTea) => {
    const newMasterTeaList = this.state.masterTeaList.concat(newTea);
    this.setState({masterTeaList: newMasterTeaList,
      formVisibleOnPage: false});
  }

  handleChangingQuantity = (id) => {
    const quantityChanged = this.state.masterTeaList.filter((tea) => tea.id === id)[0];
    quantityChanged.quantity += -1;
    if (quantityChanged.quantity <= 0) {
      quantityChanged.quantity = 0;
    }
    this.setState({quantityChanged: quantityChanged});
    this.setState({quantityChanged: false});
  }

  setVisability = () => {
    if(this.state.quantityChanged){
      return {
        component: (
          <TeaList
            onQuantityChanged={this.handleChangingQuantity}
            teaList={this.state.masterTeaList} />
        ),
      };
    }
    else if (this.state.formVisibleOnPage) {
      return {
        component: (
          <AddTeaForm
            onAddTea={this.handleAddingTeaToList} />
        ),
        buttonText: "Return to Tea List",
      };
    } else {
      return {
        component: (
          <TeaList
            onQuantityChanged={this.handleChangingQuantity} 
            teaList={this.state.masterTeaList}/>
        ),
        buttonText: "Add Tea",
      };
    }
  }

  render(){
    let currentlyVisibleState = this.setVisability();
    return (
      <React.Fragment>
        <button onClick={this.handleToggleForms}>{currentlyVisibleState.buttonText}</button>
        {currentlyVisibleState.component}
      </React.Fragment> 
    )
  }
}

export default TeaControl;