// *Category View*

var CategoryView = Backbone.View.extend({

	tagName: "li",

	// template: _.template("name:" + $("#categories").html()),
	categoriesTemplate: _.template( $("#categories").html() ), //the order is really important!!

	events: {
        "click h3.category": "all",
    },

	initialize: function(){
    	// this.listenTo(this.model, "change", this.render);
    	// this.listenTo(this.model, "destroy remove", this.remove);
    	categoryCollection.fetch();
  	},

  	defaults: {
		name: ""
	},

  	render: function(){
		var li = this.$el.html(this.categoriesTemplate(this.model.attributes));
		$('ul').append(li);
	},

	all: function(){
		console.log('clicked!');
		var id = this.model.id;
		contactCollection.fetch({success: function(e){  // display models in collection
			$('li').remove();
			for(var i=0;i<contactCollection.models.length;i++){
				if(contactCollection.models[i].attributes.category_id == id) {
					var view = new ContactView({model: contactCollection.models[i]});
					$('.categories').remove(); // remove exiting lists
					view.render();
				}
			}
		}});
	},
});

// *Category Model*

var CategoryModel = Backbone.Model.extend({
  	urlRoot: "/categories"
});

categoryModel = new CategoryModel();

// *Category Collection*

var CategoryCollection = Backbone.Collection.extend({
  	url: "/categories",
  	model: CategoryModel // put models to collection
});

categoryCollection = new CategoryCollection();

var CategoriesView = Backbone.View.extend({
	initialize: function() {
		categoryCollection.fetch({success: function(e){  // display models in collection
			for(var i=0;i<categoryCollection.models.length;i++){
				var view = new CategoryView({model: categoryCollection.models[i]});
				view.render();
			}
		}});

		console.log(categoryCollection);
	}
});

var CategoryList = new CategoriesView({ collection: categoryCollection, el: $("ul") }); // this line is for rendering a category list

// *Category View*

// var CategoryFormView = Backbone.View.extend({
//   	events: {
//     	"click button.create_category": "create"
//   	},

//   	create: function() {
//   		console.log('clicked!');
//     	var name = this.$el.find('input[name="name"]').val();
//     	this.contactCollection.create({ name: name });
//   	}
// });

$('button.create_category').click(function(){
  	console.log('clicked!');
  	var label   = this.parentElement;
  	var name    = $(label).find('input[name="name"]').val();
  	$.ajax({url: "/categories", type: 'POST', data: { name: name }, success: function(e){
  		var view = new CategoryView({model: e}); // ready to render model got from server
		view.render(); // render the added model
  	}});
  	// contactCollection.create({ name: name, age: age, address: address, number: number });
   	console.log('created');
   	$('lable.category input').val('');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// *Contact View*

var ContactView = Backbone.View.extend({

	tagName: "li",

	contactsTemplate: _.template( $("#contacts").html() ),

	contactTemplate: _.template( $("#contact").html() ),

	events: {
        "click h3.contact": "rendercontacts",
        "click h3.contact_detail": "rendercontact",
        "click button.edit": "update",
        "click button.delete": "destroy"
    },

	initialize: function(){
		console.log(this.model)
    	// this.listenTo(this.model, "change", this.render); // this line is not working
    	// this.listenTo(this.models, "destroy remove", this.remove);// this line is not working
    	contactCollection.fetch();
  	},

  	defaults: { // set defaults
		name: "",
		age: 0,
		address: "",
		phone_number: 0,
		category_id: 1,
		picture: ""
	},

  	render: function(){
		var li = this.$el.html(this.contactsTemplate(this.model.attributes)); //　apply "contactsTemplate"
		$('ul').append(li);
	},

	rendercontacts: function(){
		console.log('うぼうぼうぼ!');
		var id = this.model.id;
		contactCollection.fetch({success: function(e){  // display models in collection
			$('li').remove();
			for(var i=0;i<contactCollection.models.length;i++){
				if(contactCollection.models[i].attributes.id == id) {
					var view = new ContactView({model: contactCollection.models[i]});
					$('.contacts').remove(); //remove existing models on browse
					view.render();  // render all models
				}
			}
		}});
	},

	rendercontact: function(){
		console.log('clicked detail!');
		$('li').remove();
		var li = this.$el.html(this.contactTemplate(this.model.attributes)); // apply "contactTemplate" 
		$('ul').append(li);// render it
	},

	destroy: function() {
    	this.model.destroy();
    	this.model.remove();
  	},

  	update: function(e) {
  		console.log(this.model)
  		this.model.set('picture', this.$el.find('div.modal-content ul input[name="contact_picture"]').val());
    	this.model.set('name', this.$el.find('div.modal-content ul input[name="contact_name"]').val());
    	this.model.set('age', this.$el.find('div.modal-content ul input[name="contact_age"]').val());
		this.model.set('address', this.$el.find('div.modal-content ul input[name="contact_address"]').val());
		this.model.set('phone_number', this.$el.find('div.modal-content ul input[name="contact_number"]').val());
    	this.model.save();
    	this.model.render();
  	}
});

// *Contact Model*

var ContactModel = Backbone.Model.extend({
  	urlRoot: "/contacts"
});

contactModel = new ContactModel();

// *Contact Collection*

var ContactCollection = Backbone.Collection.extend({
  	url: "/contacts",
  	model: ContactModel // put models to collection
});

contactCollection = new ContactCollection();

var ContactsList = new ContactView({ collection: contactCollection, el: $("ul") });

//////////////////////////////////////////////////////

// *Contact Form*

var ContactFormView = Backbone.View.extend({
  	events: {
    	"click button.create_contact": "create"
  	},

  	create: function() {
  		    	    	debugger
  		console.log('clicked!');
    	var name = this.$el.find('input[name="name"]').val();
    	var age = this.$el.find('input[name="age"]').val();
    	var address = this.$el.find('input[name="address"]').val();
    	var number = this.$el.find('input[name="number"]').val();
    	contactCollection.create({ name: name, age: age, address: address, phone_number: number });
  	}
});

var formView = new ContactFormView({ el: $(".form"), collection: contactCollection })

$('button.create_contact').click(function(){
  	console.log('clicked!');
  	var label   = this.parentElement;
  	var name    = $(label).find('input[name="name"]').val();
  	var age     = $(label).find('input[name="age"]').val();
  	var address = $(label).find('input[name="address"]').val();
  	var number  = $(label).find('input[name="number"]').val();
  	var category_name  = $(label).find('input[name="category"]').val();

  	$.ajax({url: 'http://api.randomuser.me/', dataType: 'json', success: function(data){
    	var picture = data.results[0].user.picture.medium;
    	categoryCollection.fetch({success: function(e){
   			var id = e.where({name: category_name})[0].id; // get id from category name
	 		$.ajax({url: "/contacts", type: 'POST', data: { name: name, age: age, address: address, phone_number: number, picture: picture, category_id: id}, success: function(e){
	  			var view = new ContactView({model: e});
  			}});
  		}});
  	}
	});

// contactCollection.create({ name: name, age: age, address: address, number: number });
   	console.log('created');
   	$('lable.contact input#name').val('');
   	$('lable.contact input#age').val('');
   	$('lable.contact input#address').val('');
   	$('lable.contact input#number').val('');
   	$('lable.contact input#category').val('');
});

//////////////////////////////////////////////////////





