import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-bb214.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                // error freezes
                this.setState({ error: true });
            });
    }

    purchaseContinueHandler = () => {
        //alert("Purchase Continued");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Juan Vasquez',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '76131',
                    counter: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order) // .json for firebase
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    purhcasedCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseHandler = ()=> {
        this.setState({ purchasing: true });
    };

    updatePurchaseState(updatedIngredients) {
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }

        const updatedCount = this.state.ingredients[type] - 1
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purhcasedCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purhcasedCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);