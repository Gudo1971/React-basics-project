 Taste Scout  
Your personal recipe explorer — built with React and Chakra UI.

Taste Scout helps users discover delicious meals based on dietary preferences, health goals, and taste. Whether you're vegan, vegetarian, or just curious, Taste Scout finds recipes that match your profile.



 Tech Stack

-  React (Basic setup)
-  Chakra UI for styling and layout
-  Light/Dark mode with OS detection
-  LocalStorage for favorites
-  Search and filter functionality


 Responsive Design

Taste Scout is fully responsive and works seamlessly on both desktop and mobile devices. All layout components are built using Chakra UI primitives like  <Box>, <Stack> <Text> , and <Button` no raw HTML elements.



 App Structure

 Pages

Recipe Overview Page
  Displays a searchable list of recipes with:
  - Recipe name  
  - Image  
  - Diet label (if present)  
  - Cautions (if present)  
  - Meal type  
  - Dish type  
  - Health labels (Vegetarian, Vegan)

  Recipe Detail Page 
  Shows full details of a selected recipe:
  - Recipe name  
  - Image  
  - Meal type & Dish type  
  - Total cooking time  
  - Diet label  
  - All health labels  
  - Cautions  
  - Ingredients  
  - Servings  
  - Total nutrients (Energy, Protein, Fat, Carbs, Cholesterol, Sodium)  
  - Scrolls to top on load using window.scrollTo({ top: 0, behavior: "smooth" })

- Favorites Page  
  Displays recipes saved by the user using LocalStorage.

- About Me Page 
  Personal profile of the developer, including background, tech stack, and developer mindset.



 Features

- Search recipes by name  
-  View full recipe details  
-  Save and view favorite recipes  
-  Responsive layout  
-  Light/Dark mode toggle  
-  Scroll-to-top behavior on detail page  
-  Chakra UI-only components  
-  Accessible navigation between pages



 Flowchart
<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/fd8681e6-f81d-449d-8dcb-07ae90662caf" />

Extra Challenge (Optional)
Users can filter recipes by dietary preference:

Vegan

Vegetarian

Pescatarian


About the Developer
My name is Gudo. I’m a technically skilled professional with a background in electrical engineering, machine control, and logistics. I’m currently training to become a Full Stack Developer, actively building knowledge in HTML, CSS, JavaScript, Node.js, and React. Taste Scout reflects my journey combining technical depth with visual clarity.


Feedback
Mentor feedback and portfolio impact are central to this project. Every component is designed with care to reflect growth, clarity, and traceability.
