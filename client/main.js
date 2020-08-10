const baseUrl = `http://localhost:3000`

// console.log(baseUrl, "dah masuk")

function menuLogin() {
  $('#login-form').show()
  $('#full-app').hide()
  $('#add-form').hide()
  $('#list-food').hide()


}
function menuHome() {
  fecthFood()
  $('#full-app').show()
  $('#add-form').show()
  $('#list-food').show()
  $('#login-form').hide()
}
function menuLogout() {
  console.log('lewat sini')
  localStorage.clear()
  menuLogin()
}
function login(event) {
  event.preventDefault()
  const email = $('#exampleInputEmail1').val()
  const password = $('#exampleInputPassword').val()

  console.log('disini', email, password)

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email, password
    }
  })
    .done(response => {
      console.log(response.access_token)
      localStorage.setItem('access_token', response.access_token)
      menuHome()
    })
    .fail(xhr => {
      console.log(xhr.responseJSON.error)
    })
    .always(_ => {

    })

}

function fecthFood() {
  console.log('disini')

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/foods`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      $('#list-food').empty()
      console.log(response)
      localStorage.setItem('access_token', response.access_token)
      menuHome()
    })
    .fail(xhr => {
      console.log(xhr.responseJSON.error)
    })
    .always(_ => {

    })

}

function deleteFood(event, id) {
  event.preventDefault()
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/foods/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    menuHome()
  })
  .fail(xhr => {
    console.log(xhr.responseJson.error)
  })
}

function addFood (event) {
  event.preventDefault()
  const title = $('#title').val()
  const price = $('#price').val()
  const ingredients = $('#ingredients').val()
  const tag = $('#tag').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/foods`,
    headers: {
      access_token : localStorage.access_token
    },
    data: {
      title,
      price,
      ingredients,
      tag
    }
  })
  .done(response => {
    $('#title').val('')
    $('#price').val('')
    $('#ingredients').val('')
    $('#tag').val('')
  })
  .fail(xhr => {
    console.log(xhr.responseJson.error)
  })
}

$(document).ready(function () {
  if (localStorage.getItem('access_token')) {
    menuHome()
  } else {
    menuLogin()
  }
  $('#form-add').on('submit', addFood)
  $('#formLogin').on('submit', login)
  $('#buttonLogout').on('click', menuLogout)
})

