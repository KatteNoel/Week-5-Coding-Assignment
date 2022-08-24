//this will be a menu app used to create characters and stories. here is the character class we will be using:
class Character{
    constructor(name, age, gender)
    {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    describe()
    {
        return `${this.name} is ${this.age} years old and is ${this.gender}.`;
    }
}

//and here is our story class we will be using:
class Story{
    constructor(name)
    {
        this.name = name;
        this.characters = [];
    }

    addCharacter(character)
    {
        if (character instanceof Character)
        {
            this.characters.push(character);
        }
        else
        {
            throw new Error(`You can only add an instance of Character. Argument is not a player: ${player}`);
        }
    }

    describe()
    {
        return `${this.name} is a story with ${this.characters.length} characters.`;
    }
}

//and here is our main menu class which will control our functionality:
class Menu{
    constructor()
    {
        this.stories = [];
        this.selectedStory = null;
    }

    //this is our main method which will pull up our main menu options or exit the app
    start()
    {
        let selection = this.showMenuOptions();

        while (selection != 0)
        {
            switch(selection)
            {
                case '1':
                    this.createStory();
                    break;
                case '2':
                    this.viewStory();
                    break;
                case '3':
                    this.deleteStory();
                    break;
                case '4':
                    this.displayAllStories();
                    break;
                default:
                    selection = 0;
                    break;
            }

            selection = this.showMenuOptions();
        }

        alert('You are exiting the app. Goodbye!');
    }

    //these are our menu options that will be shown to the user
    showMenuOptions()
    {
        return prompt(`
            0) exit
            1) create new story
            2) view story
            3) delete story
            4) display all stories
        `);
    }

    //these are our submenu options for when we are viewing a specific story
    showStoryMenuOptions(storyInfo)
    {
        return prompt(`
            0) back
            1) create character
            2) delete character
            --------------------
            ${storyInfo}
        `);
    }

    //this method creates a story and pushes it to our stories array
    createStory()
    {
        let name = prompt('Enter a name for your new story.');
        this.stories.push(new Story(name));
    }

    //this method selects a story from our stories array, pulls up its description, and pulls up our submenu to allow us to create
    //or delete characters
    viewStory()
    {
        let index = prompt('Select the index of the story you would like to view.');

        if (index > -1 && index < this.stories.length)
        {
            this.selectedStory = this.stories[index];
            let description = 'Story Name: ' + this.selectedStory.name + '\n';

            for (let i = 0; i < this.selectedStory.characters.length; i++)
            {
                description += i + ') ' + this.selectedStory.characters[i].name + ' - ' + 
                    this.selectedStory.characters[i].age + ', ' + this.selectedStory.characters[i].gender + '\n';
            }

            let selection = this.showStoryMenuOptions(description);
            switch(selection)
            {
                case '1':
                    this.createCharacter();
                    break;
                case '2':
                    this.deleteCharacter();
                    break;
            }
        }
    }

    //this method deletes a story from the stories array
    deleteStory()
    {
        let index = prompt('Enter the index of the story you wish to delete.');
        if (index > -1 && index < this.stories.length)
        {
            this.stories.splice(index, 1);
        }
    }

    //this method displays all stories in the stories array
    displayAllStories()
    {
        let storyString = '';

        for (let i = 0; i < this.stories.length; i++)
        {
            storyString += i + ') ' + this.stories[i].name + '\n';
        }

        alert(storyString);
    }

    //this method allows us to create a character for our selected story
    createCharacter()
    {
        let name = prompt('Enter a name for your new character.');
        let age = prompt('Enter an age for your new character.');
        let gender = prompt('Enter a gender for your new character.');

        this.selectedStory.addCharacter(new Character(name, age, gender));
    }

    //this method allows us to delete a character for our selected story
    deleteCharacter()
    {
        let index = prompt('Enter the index of the player you wish to delete.');
        if (index > -1 && index < this.selectedStory.characters.length)
        {
            this.selectedStory.characters.splice(index, 1);
        }
    }
}

//this code creates an instance of our menu class and runs the start method to begin the app
const menu = new Menu();
menu.start();