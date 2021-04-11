
const connectionSting = 'https://pixabay.com/api/?key=13758930-1d93593cd503dcde0b0b6f27b';
const picsPerPage = 99;

const type = [
  {id: 1, class: ".typeSelector", value: "photo"},
  {id: 2, class: ".typeSelector", value: "illustration"},
  {id: 3, class: ".typeSelector", value: "vector"},
]

const category = [
  {id: 1, class: ".categorySelector", value: "backgrounds"},
  {id: 2, class: ".categorySelector", value: "fashion"},
  {id: 3, class: ".categorySelector", value: "nature"},
  {id: 4, class: ".categorySelector", value: "science"},
  {id: 5, class: ".categorySelector", value: "education"},
  {id: 6, class: ".categorySelector", value: "feelings"},
  {id: 7, class: ".categorySelector", value: "health"},
  {id: 8, class: ".categorySelector", value: "people"},
  {id: 9, class: ".categorySelector", value: "religion"},
  {id: 10, class: ".categorySelector", value: "places"},
  {id: 11, class: ".categorySelector", value: "animals"},
  {id: 12, class: ".categorySelector", value: "industry"},
  {id: 13, class: ".categorySelector", value: "computer"},
  {id: 14, class: ".categorySelector", value: "food"},
  {id: 15, class: ".categorySelector", value: "sports"},
  {id: 16, class: ".categorySelector", value: "transportation"},
  {id: 17, class: ".categorySelector", value: "travel"},
  {id: 18, class: ".categorySelector", value: "buildings"},
  {id: 19, class: ".categorySelector", value: "business"},
  {id: 20, class: ".categorySelector", value: "music"},
]

const color = [
  {id: 1, class: ".color-picker", value: "grayscale"},
  {id: 2, class: ".color-picker", value: "red"},
  {id: 3, class: ".color-picker", value: "orange"},
  {id: 4, class: ".color-picker", value: "yellow"},
  {id: 5, class: ".color-picker", value: "green"},
  {id: 6, class: ".color-picker", value: "blue"},
  {id: 7, class: ".color-picker", value: "lilac"},
  {id: 8, class: ".color-picker", value: "pink"},
  {id: 9, class: ".color-picker", value: "brown"},
  {id: 10, class: ".color-picker", value: "white"},
  {id: 11, class: ".color-picker", value: "gray"},
  {id: 12, class: ".color-picker", value: "black"},
]


  setSelector(type);
  setSelector(category);
  setColorSelector(color);


window.onload = function() {
  
};

$('.-button.search').click(function(){

  let searchStr = ('&q=' + $('.gl-search').val());
  let typeStr = ('&image_type=' + $('.typeSelector').val().join('+'));
  let categoryStr = ('&category=' + $('.categorySelector').val().join('+'));
  let colorStr = ('&colors=' + getColorsSelect().join('+'));
  let queryStr = connectionSting + searchStr + typeStr + categoryStr + colorStr + "&per_page=" + picsPerPage;

  getPictureCollection(queryStr);
});

function refresh() {
  window.location.reload();
}


// --- Form control --------------------
$(function () {
  $(`.-button.ext`).click(function() {
    $(`.ext-panel`).slideToggle();
  });
})

$(function closeUserForm(){
  $(document).mouseup(function (event){
    if (!$(event.target).hasClass(`ext-status`)
        && !$(event.target).parents(`.ext-status`).length) {
      $(`.ext-panel`).slideUp(200);
    }
  });
});

function getColorsSelect() {
  let arr = [];
  $('.colorcheck:checked').each(function() {
    arr.push($(this).val());
  });
  return arr;
}

// TODO http://slimselectjs.com/

let typeSelector = new SlimSelect({
    select: '.typeSelector',
    placeholder: 'Select image type',
    showSearch: false,
})

let categorySelector = new SlimSelect({
  select: '.categorySelector',
  placeholder: 'Select image category',
  showSearch: false,
})
// ----------------------------------

function getPictureCollection(fullRequest) {
  fetch(fullRequest) // GET
    .then((response) => response.json())
    .then((fullRequest) => {
      fullRequest.hits.forEach((pict) => {
        let deltaID = pict.id;
        let deltaSmallPic = pict.previewURL;
        let deltaBigPic = pict.webformatURL;
        $('.gallery').append(`
          <a href="${deltaBigPic}">
            <img src="${deltaSmallPic}" alt="${deltaID}"/>
          </a>
        `);
      });
    })
    .catch((error) => {
    console.log(error);
    });
}

function setSelector(selector) {
  selector.forEach((item) => {
    let deltaSelector = item.class;
    let deltaValue = item.value;
    $(`${deltaSelector}`).append(`
      <option class = "list-item img-type" value=${deltaValue}>${deltaValue}</option>
    `);
  });
}

function setColorSelector(selector) {
  selector.forEach((item) => {
    let deltaSelector = item.class;
    let deltaValue = item.value;
    $(`${deltaSelector}`).append(`
      <div class = "chkbox">
        <input id=${deltaValue} class="colorcheck" type="checkbox" value=${deltaValue}>
        <span class="check"></span>
        <label class="material-icons" for=${deltaValue}><span class=${deltaValue}>circle</span></label>
      </div>
    `);
  });
}