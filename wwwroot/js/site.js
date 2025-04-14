let apiURL = "https://forkify-api.herokuapp.com/api/v2/recipes";
let apikey = "adac71ca-88ba-4932-8a8a-a8ba1329d577";

async function GetRecipes(recipeName, id, isAllShow) {
    try {
        let resp = await fetch(`${apiURL}?search=${recipeName}&key=${apikey}`);
        if (!resp.ok) {
            throw new Error('Network response was not ok ' + resp.statusText);
        }
        let result = await resp.json();
        let Recipes = isAllShow ? result.data.recipes : result.data.recipes.slice(1, 7);
        showRecipes(Recipes, id);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function showRecipes(recipes, id) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        type: 'POST',
        url: '/Recipe/GetRecipeCard',
        data: JSON.stringify(recipes),
        success: function (htmlResult) {
            $('#' + id).html(htmlResult);
        },
        error: function (xhr, status, error) {
            console.error('There has been a problem with your AJAX request:', status, error);
        }
    });
}

async function getOrderRecipe(id,showId) {

    let resp = await fetch(`${apiURL}/${id}?key=${apikey}`);
    let result = await resp.json();
    console.log(result);   
    let recipe = result.data.recipe;
    showOrderRecipeDetails(recipe, showId);
}
function showOrderRecipeDetails(orderRecipeDetails, showId) {
    /*console.log(orderRecipeDetails)*/
    $.ajax({
        url: '/Recipe/ShowOrder',
        data: orderRecipeDetails,
        dataType: 'html',
        type: 'POST',
        success: function (htmlResult) {
            $('#' + showId).html(htmlResult);
        }
    });
}

//order page

function quantity(option) {
    let qty = $('#qty').val();
    let price = parseInt($('#price').val());
    let totalAmount = 0;
    if (option === 'inc') {
        qty = parseInt(qty) + 1;
    } else {
        qty = qty == 1 ? qty : qty - 1;
    }
    totalAmount = price * qty;
    $('#qty').val(qty);
    $('#totalAmount').val(totalAmount);
}
