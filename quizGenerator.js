// ==========================================================================
// AI Quiz Generator - Smart Question Bank for EduNexus
// Generates contextual MCQ questions based on subject + topic + class level
// ==========================================================================

// ---- QUESTION BANKS BY SUBJECT ----

const questionBanks = {

  // ======================== MATHS ========================
  Maths: {
    'Algebra': [
      { q: 'What is the value of x in: 2x + 6 = 14?', opts: ['4', '3', '5', '8'], correct: 0 },
      { q: 'Simplify: 3(x + 2) - x', opts: ['2x + 6', '4x + 6', '3x + 2', '2x + 2'], correct: 0 },
      { q: 'If a = 5 and b = 3, what is a² - b²?', opts: ['16', '8', '25', '34'], correct: 0 },
      { q: 'Which of the following is a linear equation?', opts: ['2x + 3 = 7', 'x² + 1 = 0', 'x³ = 27', 'xy = 6'], correct: 0 },
      { q: 'What is the coefficient of x in 7x - 3?', opts: ['7', '-3', '3', 'x'], correct: 0 },
      { q: 'Solve: 5x = 45', opts: ['9', '40', '50', '225'], correct: 0 },
      { q: 'If x + y = 10 and x - y = 4, what is x?', opts: ['7', '6', '3', '8'], correct: 0 },
      { q: 'Expand: (a + b)²', opts: ['a² + 2ab + b²', 'a² + b²', 'a² - 2ab + b²', '2a + 2b'], correct: 0 },
    ],
    'Geometry': [
      { q: 'How many sides does a hexagon have?', opts: ['6', '5', '7', '8'], correct: 0 },
      { q: 'The sum of angles in a triangle is?', opts: ['180°', '360°', '90°', '270°'], correct: 0 },
      { q: 'What is the area of a rectangle with length 8 and width 5?', opts: ['40', '26', '13', '80'], correct: 0 },
      { q: 'A circle has a radius of 7 cm. What is its diameter?', opts: ['14 cm', '7 cm', '21 cm', '49 cm'], correct: 0 },
      { q: 'Which shape has all sides equal and all angles 90°?', opts: ['Square', 'Rectangle', 'Rhombus', 'Trapezium'], correct: 0 },
      { q: 'What is the perimeter of a square with side 9 cm?', opts: ['36 cm', '81 cm', '18 cm', '27 cm'], correct: 0 },
      { q: 'How many degrees in a right angle?', opts: ['90°', '180°', '45°', '360°'], correct: 0 },
      { q: 'What is the area of a triangle with base 10 and height 6?', opts: ['30', '60', '16', '20'], correct: 0 },
    ],
    'Fractions': [
      { q: 'What is 1/2 + 1/4?', opts: ['3/4', '2/4', '1/6', '2/6'], correct: 0 },
      { q: 'Simplify: 8/12', opts: ['2/3', '4/6', '3/4', '1/2'], correct: 0 },
      { q: 'What is 3/5 of 20?', opts: ['12', '15', '10', '4'], correct: 0 },
      { q: 'Which fraction is the largest?', opts: ['3/4', '1/2', '2/5', '1/3'], correct: 0 },
      { q: 'Convert 0.75 to a fraction', opts: ['3/4', '7/5', '1/4', '7/10'], correct: 0 },
      { q: 'What is 2/3 × 3/4?', opts: ['1/2', '6/7', '5/12', '2/4'], correct: 0 },
    ],
    'Number System': [
      { q: 'Which is the smallest prime number?', opts: ['2', '1', '3', '0'], correct: 0 },
      { q: 'What is the HCF of 12 and 18?', opts: ['6', '3', '12', '36'], correct: 0 },
      { q: 'What is the LCM of 4 and 6?', opts: ['12', '24', '2', '6'], correct: 0 },
      { q: 'Is 91 a prime number?', opts: ['No', 'Yes', 'Cannot determine', 'Only if divisible by 3'], correct: 0 },
      { q: 'What is the square root of 144?', opts: ['12', '14', '11', '13'], correct: 0 },
      { q: 'What type of number is -7?', opts: ['Integer', 'Natural number', 'Whole number', 'Irrational number'], correct: 0 },
    ],
    'Percentage': [
      { q: 'What is 25% of 200?', opts: ['50', '25', '75', '100'], correct: 0 },
      { q: 'Convert 3/5 to percentage', opts: ['60%', '35%', '53%', '75%'], correct: 0 },
      { q: 'A shirt costs ₹800 and has a 10% discount. What is the sale price?', opts: ['₹720', '₹700', '₹780', '₹880'], correct: 0 },
      { q: 'What percentage is 45 out of 90?', opts: ['50%', '45%', '90%', '55%'], correct: 0 },
      { q: 'If a number increases from 50 to 65, what is the percentage increase?', opts: ['30%', '15%', '25%', '65%'], correct: 0 },
    ],
    'Mensuration': [
      { q: 'What is the volume of a cube with side 5 cm?', opts: ['125 cm³', '25 cm³', '150 cm³', '75 cm³'], correct: 0 },
      { q: 'Find the area of a circle with radius 7 cm (π = 22/7)', opts: ['154 cm²', '44 cm²', '22 cm²', '49 cm²'], correct: 0 },
      { q: 'What is the surface area of a cuboid with l=3, b=4, h=5?', opts: ['94 cm²', '60 cm²', '47 cm²', '120 cm²'], correct: 0 },
      { q: 'The circumference of a circle with diameter 14 cm is?', opts: ['44 cm', '28 cm', '22 cm', '88 cm'], correct: 0 },
      { q: 'What is the volume of a cylinder with r=7 and h=10? (π = 22/7)', opts: ['1540 cm³', '440 cm³', '770 cm³', '220 cm³'], correct: 0 },
    ],
  },

  // ======================== SCIENCE ========================
  Science: {
    'Force and Motion': [
      { q: 'What is the SI unit of force?', opts: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 0 },
      { q: 'Who formulated the three laws of motion?', opts: ['Isaac Newton', 'Albert Einstein', 'Galileo', 'Archimedes'], correct: 0 },
      { q: 'What type of force is friction?', opts: ['Contact force', 'Non-contact force', 'Nuclear force', 'Magnetic force'], correct: 0 },
      { q: 'What is the formula for speed?', opts: ['Distance / Time', 'Time / Distance', 'Force × Time', 'Mass × Velocity'], correct: 0 },
      { q: 'Which law states: Every action has an equal and opposite reaction?', opts: ['Third law', 'First law', 'Second law', 'Law of gravitation'], correct: 0 },
      { q: 'What is the acceleration due to gravity on Earth?', opts: ['9.8 m/s²', '10.5 m/s²', '8.9 m/s²', '6.7 m/s²'], correct: 0 },
    ],
    'Human Body': [
      { q: 'How many bones are in the adult human body?', opts: ['206', '208', '300', '196'], correct: 0 },
      { q: 'Which organ pumps blood in the human body?', opts: ['Heart', 'Liver', 'Kidney', 'Lungs'], correct: 0 },
      { q: 'What is the largest organ of the human body?', opts: ['Skin', 'Liver', 'Brain', 'Intestine'], correct: 0 },
      { q: 'Red blood cells are produced in the?', opts: ['Bone marrow', 'Heart', 'Liver', 'Spleen'], correct: 0 },
      { q: 'Which part of the brain controls balance?', opts: ['Cerebellum', 'Cerebrum', 'Medulla', 'Hypothalamus'], correct: 0 },
      { q: 'What gas do we breathe in?', opts: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correct: 0 },
    ],
    'Plant Biology': [
      { q: 'What is the process by which plants make food?', opts: ['Photosynthesis', 'Respiration', 'Transpiration', 'Digestion'], correct: 0 },
      { q: 'Which part of a plant absorbs water from the soil?', opts: ['Roots', 'Leaves', 'Stem', 'Flower'], correct: 0 },
      { q: 'What gas do plants release during photosynthesis?', opts: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Methane'], correct: 0 },
      { q: 'Chlorophyll gives leaves their ______ color.', opts: ['Green', 'Yellow', 'Red', 'Brown'], correct: 0 },
      { q: 'Which part of the plant is responsible for reproduction?', opts: ['Flower', 'Leaf', 'Stem', 'Root'], correct: 0 },
      { q: 'What is the function of xylem in plants?', opts: ['Transport water', 'Transport food', 'Photosynthesis', 'Reproduction'], correct: 0 },
    ],
    'Chemistry Basics': [
      { q: 'What is the chemical symbol for water?', opts: ['H₂O', 'CO₂', 'O₂', 'NaCl'], correct: 0 },
      { q: 'Which gas is most abundant in the atmosphere?', opts: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon'], correct: 0 },
      { q: 'What is the pH value of pure water?', opts: ['7', '0', '14', '1'], correct: 0 },
      { q: 'What type of change is rusting of iron?', opts: ['Chemical change', 'Physical change', 'Reversible change', 'Temporary change'], correct: 0 },
      { q: 'Which element has atomic number 1?', opts: ['Hydrogen', 'Helium', 'Lithium', 'Oxygen'], correct: 0 },
      { q: 'Acids turn blue litmus paper to?', opts: ['Red', 'Green', 'Yellow', 'No change'], correct: 0 },
    ],
    'Light and Sound': [
      { q: 'What is the speed of light approximately?', opts: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁴ m/s', '3 × 10¹⁰ m/s'], correct: 0 },
      { q: 'Sound cannot travel through?', opts: ['Vacuum', 'Water', 'Air', 'Steel'], correct: 0 },
      { q: 'Which mirror is used in headlights of a car?', opts: ['Concave mirror', 'Convex mirror', 'Plane mirror', 'Cylindrical mirror'], correct: 0 },
      { q: 'What is the phenomenon of bending of light called?', opts: ['Refraction', 'Reflection', 'Diffraction', 'Dispersion'], correct: 0 },
      { q: 'The splitting of white light into colors is called?', opts: ['Dispersion', 'Refraction', 'Reflection', 'Absorption'], correct: 0 },
    ],
    'Electricity': [
      { q: 'What is the SI unit of electric current?', opts: ['Ampere', 'Volt', 'Ohm', 'Watt'], correct: 0 },
      { q: 'Which device is used to measure voltage?', opts: ['Voltmeter', 'Ammeter', 'Galvanometer', 'Ohmmeter'], correct: 0 },
      { q: 'Ohm\'s law states V = ?', opts: ['IR', 'I/R', 'R/I', 'I²R'], correct: 0 },
      { q: 'What is the unit of electrical resistance?', opts: ['Ohm', 'Ampere', 'Volt', 'Farad'], correct: 0 },
      { q: 'Which material is the best conductor of electricity?', opts: ['Silver', 'Iron', 'Wood', 'Rubber'], correct: 0 },
    ],
  },

  // ======================== ENGLISH ========================
  English: {
    'Grammar': [
      { q: 'Which of these is a pronoun?', opts: ['She', 'Beautiful', 'Quickly', 'Running'], correct: 0 },
      { q: 'Identify the adjective: "The tall boy ran fast."', opts: ['Tall', 'Boy', 'Ran', 'Fast'], correct: 0 },
      { q: 'What is the plural of "child"?', opts: ['Children', 'Childs', 'Childrens', 'Childies'], correct: 0 },
      { q: 'Which tense is "She has been reading"?', opts: ['Present perfect continuous', 'Past perfect', 'Simple present', 'Future continuous'], correct: 0 },
      { q: '"Run" is which part of speech?', opts: ['Verb', 'Noun', 'Adjective', 'Adverb'], correct: 0 },
      { q: 'What is the superlative form of "good"?', opts: ['Best', 'Better', 'Gooder', 'Goodest'], correct: 0 },
      { q: 'Which sentence is grammatically correct?', opts: ['He doesn\'t have any books.', 'He don\'t have no books.', 'He doesn\'t has any books.', 'He don\'t has no books.'], correct: 0 },
      { q: 'Identify the conjunction: "I was tired but I stayed awake."', opts: ['But', 'I', 'Tired', 'Awake'], correct: 0 },
    ],
    'Vocabulary': [
      { q: 'What is the meaning of "benevolent"?', opts: ['Kind and generous', 'Angry', 'Lazy', 'Secretive'], correct: 0 },
      { q: 'Which word is an antonym of "ancient"?', opts: ['Modern', 'Old', 'Historic', 'Vintage'], correct: 0 },
      { q: 'What is a synonym of "happy"?', opts: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0 },
      { q: '"Enormous" means?', opts: ['Very large', 'Very small', 'Very fast', 'Very slow'], correct: 0 },
      { q: 'What is the meaning of "fragile"?', opts: ['Easily broken', 'Very strong', 'Colorful', 'Expensive'], correct: 0 },
      { q: 'Which word means "to make something better"?', opts: ['Improve', 'Worsen', 'Ignore', 'Destroy'], correct: 0 },
    ],
    'Comprehension': [
      { q: 'What is the main purpose of a topic sentence in a paragraph?', opts: ['To introduce the main idea', 'To conclude the paragraph', 'To add humor', 'To list examples'], correct: 0 },
      { q: 'In a story, "setting" refers to?', opts: ['Time and place', 'Main character', 'Plot twist', 'Moral lesson'], correct: 0 },
      { q: 'What is the purpose of a conclusion in an essay?', opts: ['To summarize key points', 'To introduce new ideas', 'To ask questions', 'To start a debate'], correct: 0 },
      { q: 'A "narrative" is a type of?', opts: ['Story', 'Poem', 'Dictionary', 'Formula'], correct: 0 },
      { q: 'The "protagonist" is the?', opts: ['Main character', 'Villain', 'Narrator', 'Setting'], correct: 0 },
    ],
    'Writing Skills': [
      { q: 'Which punctuation is used at the end of a question?', opts: ['Question mark (?)', 'Exclamation mark (!)', 'Period (.)', 'Comma (,)'], correct: 0 },
      { q: 'What is an "essay"?', opts: ['A short piece of writing on a topic', 'A type of poem', 'A list of words', 'A math formula'], correct: 0 },
      { q: 'A "simile" uses which words for comparison?', opts: ['"like" or "as"', '"is" or "are"', '"but" or "and"', '"not" or "never"'], correct: 0 },
      { q: 'What is an "alliteration"?', opts: ['Repetition of initial consonant sounds', 'A type of rhyme', 'End of a sentence', 'A long story'], correct: 0 },
      { q: 'Which of these is a correct sentence?', opts: ['The cat sat on the mat.', 'cat The on sat mat the.', 'Sat cat the the on mat.', 'On mat the cat sat the.'], correct: 0 },
    ],
  },

  // ======================== GENERAL KNOWLEDGE ========================
  'General Knowledge': {
    'World Geography': [
      { q: 'Which is the largest continent?', opts: ['Asia', 'Africa', 'Europe', 'North America'], correct: 0 },
      { q: 'What is the capital of France?', opts: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 0 },
      { q: 'Which is the longest river in the world?', opts: ['Nile', 'Amazon', 'Ganges', 'Mississippi'], correct: 0 },
      { q: 'Mount Everest is located in which mountain range?', opts: ['Himalayas', 'Andes', 'Alps', 'Rockies'], correct: 0 },
      { q: 'Which ocean is the largest?', opts: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], correct: 0 },
      { q: 'What is the smallest country in the world?', opts: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'], correct: 0 },
    ],
    'Indian History': [
      { q: 'Who is known as the Father of the Nation in India?', opts: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Subhas Chandra Bose', 'Sardar Patel'], correct: 0 },
      { q: 'In which year did India gain independence?', opts: ['1947', '1950', '1942', '1945'], correct: 0 },
      { q: 'The Taj Mahal was built by which Mughal emperor?', opts: ['Shah Jahan', 'Akbar', 'Aurangzeb', 'Babur'], correct: 0 },
      { q: 'Who wrote the Indian national anthem?', opts: ['Rabindranath Tagore', 'Bankim Chandra', 'Sarojini Naidu', 'Mahatma Gandhi'], correct: 0 },
      { q: 'The battle of Plassey was fought in which year?', opts: ['1757', '1857', '1947', '1761'], correct: 0 },
      { q: 'Who was the first President of India?', opts: ['Dr. Rajendra Prasad', 'Jawaharlal Nehru', 'Sardar Patel', 'B.R. Ambedkar'], correct: 0 },
    ],
    'Sports': [
      { q: 'How many players are in a cricket team?', opts: ['11', '15', '9', '7'], correct: 0 },
      { q: 'Which country hosted the 2020 Olympics?', opts: ['Japan', 'China', 'Brazil', 'UK'], correct: 0 },
      { q: 'In football, what is a "hat-trick"?', opts: ['3 goals by one player', '3 saves', '3 fouls', '3 assists'], correct: 0 },
      { q: 'Which sport uses a shuttlecock?', opts: ['Badminton', 'Tennis', 'Table Tennis', 'Squash'], correct: 0 },
      { q: 'How many rings are on the Olympic flag?', opts: ['5', '4', '6', '3'], correct: 0 },
      { q: 'The "Ashes" is a cricket series between which two countries?', opts: ['England and Australia', 'India and Pakistan', 'South Africa and New Zealand', 'West Indies and Sri Lanka'], correct: 0 },
    ],
    'Science & Nature': [
      { q: 'Which planet is known as the Red Planet?', opts: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correct: 0 },
      { q: 'How many planets are in our solar system?', opts: ['8', '9', '7', '10'], correct: 0 },
      { q: 'What is the chemical formula for common salt?', opts: ['NaCl', 'H₂O', 'CO₂', 'KCl'], correct: 0 },
      { q: 'Which animal is the fastest on land?', opts: ['Cheetah', 'Lion', 'Horse', 'Deer'], correct: 0 },
      { q: 'What is the hardest natural substance?', opts: ['Diamond', 'Gold', 'Iron', 'Platinum'], correct: 0 },
    ],
    'Current Affairs': [
      { q: 'Which organization is known as the "world body" for maintaining peace?', opts: ['United Nations', 'NATO', 'WHO', 'WTO'], correct: 0 },
      { q: 'What does "GDP" stand for?', opts: ['Gross Domestic Product', 'General Data Program', 'Global Development Plan', 'Great Domestic Power'], correct: 0 },
      { q: 'Which country has the largest population in the world?', opts: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
      { q: 'What does "UNESCO" stand for?', opts: ['United Nations Educational, Scientific and Cultural Organization', 'United Nations Energy Security Council', 'Universal National Education System', 'United Nations Economic Committee'], correct: 0 },
    ],
  },

  // ======================== COMPUTER ========================
  Computer: {
    'Computer Basics': [
      { q: 'What does CPU stand for?', opts: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0 },
      { q: 'Which of these is an input device?', opts: ['Keyboard', 'Monitor', 'Printer', 'Speaker'], correct: 0 },
      { q: 'What is the brain of the computer?', opts: ['CPU', 'RAM', 'Hard disk', 'Monitor'], correct: 0 },
      { q: 'RAM stands for?', opts: ['Random Access Memory', 'Read Access Memory', 'Run Application Memory', 'Rapid Access Module'], correct: 0 },
      { q: 'Which device is used to print documents?', opts: ['Printer', 'Scanner', 'Keyboard', 'Mouse'], correct: 0 },
      { q: 'What does "OS" stand for?', opts: ['Operating System', 'Open Software', 'Optical Scanner', 'Output System'], correct: 0 },
    ],
    'Internet': [
      { q: 'What does "WWW" stand for?', opts: ['World Wide Web', 'Wide World Web', 'Web Wide World', 'World Web Wide'], correct: 0 },
      { q: 'Which protocol is used for secure websites?', opts: ['HTTPS', 'FTP', 'HTTP', 'SMTP'], correct: 0 },
      { q: 'What is a "browser"?', opts: ['Software to access websites', 'A type of virus', 'An email client', 'A search engine'], correct: 0 },
      { q: 'Which of these is a search engine?', opts: ['Google', 'Windows', 'Microsoft Word', 'Excel'], correct: 0 },
      { q: 'What does "URL" stand for?', opts: ['Uniform Resource Locator', 'Universal Resource Link', 'Unified Resource Locator', 'User Resource Location'], correct: 0 },
      { q: '"Email" stands for?', opts: ['Electronic Mail', 'Express Mail', 'Encrypted Mail', 'External Mail'], correct: 0 },
    ],
    'Programming': [
      { q: 'Which language is known as the "mother of all languages"?', opts: ['C', 'Java', 'Python', 'HTML'], correct: 0 },
      { q: 'HTML is used to create?', opts: ['Web pages', 'Software', 'Operating systems', 'Games'], correct: 0 },
      { q: 'What symbol is used for comments in Python?', opts: ['#', '//', '/*', '<!--'], correct: 0 },
      { q: 'What does "IDE" stand for?', opts: ['Integrated Development Environment', 'Internet Development Engine', 'Input Data Entry', 'Internal Design Editor'], correct: 0 },
      { q: 'Which of these is a programming language?', opts: ['Python', 'Photoshop', 'PowerPoint', 'Chrome'], correct: 0 },
      { q: 'What is a "variable" in programming?', opts: ['A container to store data', 'A type of loop', 'A built-in function', 'A file format'], correct: 0 },
    ],
    'MS Office': [
      { q: 'Which software is used for creating spreadsheets?', opts: ['Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'Microsoft Paint'], correct: 0 },
      { q: 'What is the extension of a Word document?', opts: ['.docx', '.xlsx', '.pptx', '.pdf'], correct: 0 },
      { q: 'Which shortcut is used to copy text?', opts: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'], correct: 0 },
      { q: 'Ctrl + Z is used for?', opts: ['Undo', 'Redo', 'Copy', 'Paste'], correct: 0 },
      { q: 'Which software is used for presentations?', opts: ['PowerPoint', 'Excel', 'Notepad', 'Paint'], correct: 0 },
      { q: 'What does "Save As" do?', opts: ['Saves the file with a new name/location', 'Deletes the file', 'Prints the file', 'Closes the application'], correct: 0 },
    ],
    'Cyber Safety': [
      { q: 'What is a "password"?', opts: ['A secret code to protect accounts', 'A type of software', 'A computer component', 'An internet protocol'], correct: 0 },
      { q: 'What is "phishing"?', opts: ['A fraudulent attempt to steal information', 'A type of game', 'A social media platform', 'A programming technique'], correct: 0 },
      { q: 'Which of these is a strong password?', opts: ['P@ssw0rd!23', 'password', '123456', 'abcdef'], correct: 0 },
      { q: 'What is a "firewall"?', opts: ['A security system to protect networks', 'A type of virus', 'A browser extension', 'A hardware component'], correct: 0 },
      { q: 'What should you NOT share online?', opts: ['Your personal passwords', 'Your favorite book', 'Your school name', 'Your hobby'], correct: 0 },
    ],
  },
};

// ---- TOPIC ALIASES / KEYWORD MATCHER ----
const topicAliases = {
  // Maths
  'add': 'Algebra', 'subtract': 'Algebra', 'equation': 'Algebra', 'variable': 'Algebra', 'expression': 'Algebra',
  'shape': 'Geometry', 'angle': 'Geometry', 'triangle': 'Geometry', 'circle': 'Geometry', 'polygon': 'Geometry', 'area': 'Geometry', 'perimeter': 'Geometry',
  'fraction': 'Fractions', 'decimal': 'Fractions', 'ratio': 'Fractions',
  'prime': 'Number System', 'hcf': 'Number System', 'lcm': 'Number System', 'factor': 'Number System', 'number': 'Number System', 'integer': 'Number System',
  'percent': 'Percentage', 'discount': 'Percentage', 'profit': 'Percentage', 'loss': 'Percentage',
  'volume': 'Mensuration', 'surface': 'Mensuration', 'cylinder': 'Mensuration', 'cube': 'Mensuration', 'cuboid': 'Mensuration',
  // Science
  'force': 'Force and Motion', 'motion': 'Force and Motion', 'gravity': 'Force and Motion', 'newton': 'Force and Motion', 'speed': 'Force and Motion', 'acceleration': 'Force and Motion',
  'body': 'Human Body', 'organ': 'Human Body', 'bone': 'Human Body', 'blood': 'Human Body', 'heart': 'Human Body', 'brain': 'Human Body', 'digest': 'Human Body',
  'plant': 'Plant Biology', 'photosynthesis': 'Plant Biology', 'leaf': 'Plant Biology', 'root': 'Plant Biology', 'flower': 'Plant Biology',
  'chemical': 'Chemistry Basics', 'atom': 'Chemistry Basics', 'element': 'Chemistry Basics', 'acid': 'Chemistry Basics', 'base': 'Chemistry Basics', 'ph': 'Chemistry Basics', 'reaction': 'Chemistry Basics',
  'light': 'Light and Sound', 'sound': 'Light and Sound', 'mirror': 'Light and Sound', 'lens': 'Light and Sound', 'wave': 'Light and Sound', 'reflection': 'Light and Sound',
  'electric': 'Electricity', 'current': 'Electricity', 'voltage': 'Electricity', 'circuit': 'Electricity', 'resistor': 'Electricity', 'ohm': 'Electricity',
  // English
  'grammar': 'Grammar', 'tense': 'Grammar', 'noun': 'Grammar', 'verb': 'Grammar', 'pronoun': 'Grammar', 'adjective': 'Grammar', 'adverb': 'Grammar', 'sentence': 'Grammar',
  'vocabulary': 'Vocabulary', 'synonym': 'Vocabulary', 'antonym': 'Vocabulary', 'meaning': 'Vocabulary', 'word': 'Vocabulary',
  'comprehension': 'Comprehension', 'passage': 'Comprehension', 'reading': 'Comprehension', 'story': 'Comprehension', 'paragraph': 'Comprehension',
  'writing': 'Writing Skills', 'essay': 'Writing Skills', 'letter': 'Writing Skills', 'punctuation': 'Writing Skills', 'poem': 'Writing Skills',
  // GK
  'geography': 'World Geography', 'country': 'World Geography', 'capital': 'World Geography', 'continent': 'World Geography', 'river': 'World Geography', 'mountain': 'World Geography', 'ocean': 'World Geography',
  'history': 'Indian History', 'india': 'Indian History', 'independence': 'Indian History', 'mughal': 'Indian History', 'freedom': 'Indian History',
  'sport': 'Sports', 'cricket': 'Sports', 'football': 'Sports', 'olympic': 'Sports', 'game': 'Sports',
  'planet': 'Science & Nature', 'space': 'Science & Nature', 'solar': 'Science & Nature', 'animal': 'Science & Nature', 'nature': 'Science & Nature',
  'affair': 'Current Affairs', 'gdp': 'Current Affairs', 'un': 'Current Affairs', 'government': 'Current Affairs',
  // Computer
  'cpu': 'Computer Basics', 'ram': 'Computer Basics', 'hardware': 'Computer Basics', 'input': 'Computer Basics', 'output': 'Computer Basics', 'basic': 'Computer Basics', 'device': 'Computer Basics',
  'internet': 'Internet', 'web': 'Internet', 'browser': 'Internet', 'website': 'Internet', 'email': 'Internet', 'url': 'Internet',
  'programming': 'Programming', 'coding': 'Programming', 'python': 'Programming', 'java': 'Programming', 'html': 'Programming', 'code': 'Programming', 'language': 'Programming',
  'office': 'MS Office', 'excel': 'MS Office', 'word': 'MS Office', 'powerpoint': 'MS Office', 'spreadsheet': 'MS Office',
  'cyber': 'Cyber Safety', 'safety': 'Cyber Safety', 'password': 'Cyber Safety', 'virus': 'Cyber Safety', 'security': 'Cyber Safety', 'phishing': 'Cyber Safety', 'hack': 'Cyber Safety',
};

// ---- SHUFFLE UTILITY ----
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- CORE GENERATOR ----
export const generateQuizQuestions = (subject, topic, count = 5) => {
  const subjectBank = questionBanks[subject];
  if (!subjectBank) {
    return { error: `No question bank available for subject: ${subject}` };
  }

  // 1. Try exact topic match
  let matchedTopic = null;
  const topicLower = topic.toLowerCase().trim();

  for (const t of Object.keys(subjectBank)) {
    if (t.toLowerCase() === topicLower) {
      matchedTopic = t;
      break;
    }
  }

  // 2. Try keyword alias match
  if (!matchedTopic) {
    const words = topicLower.split(/\s+/);
    for (const word of words) {
      if (topicAliases[word] && subjectBank[topicAliases[word]]) {
        matchedTopic = topicAliases[word];
        break;
      }
    }
  }

  // 3. Try partial match on topic names
  if (!matchedTopic) {
    for (const t of Object.keys(subjectBank)) {
      if (t.toLowerCase().includes(topicLower) || topicLower.includes(t.toLowerCase())) {
        matchedTopic = t;
        break;
      }
    }
  }

  // 4. Fallback: pick a random topic from this subject
  if (!matchedTopic) {
    const allTopics = Object.keys(subjectBank);
    matchedTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
  }

  // 5. Get the question pool and possibly merge from other topics for variety
  let pool = [...subjectBank[matchedTopic]];

  // If not enough questions, pull from other topics in the same subject
  if (pool.length < count) {
    const otherTopics = Object.keys(subjectBank).filter(t => t !== matchedTopic);
    for (const ot of shuffleArray(otherTopics)) {
      pool = pool.concat(subjectBank[ot]);
      if (pool.length >= count) break;
    }
  }

  // 6. Shuffle and pick
  const selected = shuffleArray(pool).slice(0, count);

  // 7. Shuffle options for each question (move correct answer randomly)
  const questions = selected.map((item) => {
    const optionsWithIndex = item.opts.map((opt, i) => ({ text: opt, wasCorrect: i === item.correct }));
    const shuffledOpts = shuffleArray(optionsWithIndex);
    const correctAnswerIndex = shuffledOpts.findIndex(o => o.wasCorrect);

    return {
      questionText: item.q,
      options: shuffledOpts.map(o => o.text),
      correctAnswerIndex,
      points: 10,
    };
  });

  return { questions, matchedTopic };
};
