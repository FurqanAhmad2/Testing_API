import React from 'react'
import Footer from "../components/layout/footer/footer"

function LDPCA() {
  return (
    <body class="bg-gray-100 font-sans">

    <nav class="bg-indigo-700 py-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-white text-xl font-semibold tracking-wider">Diasporan Connection</a>
            <ul class="flex space-x-6">
                <li><a href="#about" class="text-white hover:text-indigo-300 transition duration-300">About Us</a></li>
                <li><a href="#vision" class="text-white hover:text-indigo-300 transition duration-300">Our Vision</a></li>
                <li><a href="#how-it-works" class="text-white hover:text-indigo-300 transition duration-300">How It Works</a></li>
                <li><a href="#benefits" class="text-white hover:text-indigo-300 transition duration-300">Benefits</a></li>
                <li><a href="#membership" class="text-white hover:text-indigo-300 transition duration-300">Membership</a></li>
                <li><a href="#get-involved" class="text-white hover:text-indigo-300 transition duration-300">Get Involved</a></li>
                <li><a href="#contact" class="text-white hover:text-indigo-300 transition duration-300">Contact Us</a></li>
            </ul>
        </div>
    </nav>

    <header class="bg-indigo-800 text-white py-20">
        <div class="container mx-auto text-center">
            <h1 class="text-5xl font-bold mb-4 tracking-wide"
            style={{color: 'white'}}>Welcome to the Diasporan Connection Initiative</h1>
            <p class="text-lg">Strengthening bonds between African diasporans and their home continent.</p>
        </div>
    </header>

    <section id="about" class="py-16">
        <div class="container mx-auto">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
                <img src="images/about.jpg" alt="About Us" class="w-full lg:w-1/2 mb-8 lg:mb-0 rounded-lg shadow-lg" />
                <div class="lg:w-1/2">
                    <h2 class="text-3xl font-semibold mb-4">About Us</h2>
                    <p class="text-gray-700 leading-relaxed">
                        The Diasporan Connection Initiative is a visionary project aimed at strengthening the bonds between African diasporans and their home continent. Our mission is to bridge the gap between diasporans living abroad and corporate organizations in Africa, facilitating seamless transitions for those returning or relocating to their roots. Through a dynamic blend of professional engagement and cultural collaboration, we're shaping a future where skills, expertise, and opportunities flow freely across borders.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="vision" class="bg-gray-100 py-16">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-semibold mb-4">Our Vision</h2>
            <p class="text-gray-700 leading-relaxed">
                Imagine a world where the talents of African diasporans contribute to the growth and prosperity of their home countries. Our vision is to facilitate a two-way exchange that empowers diasporan professionals to share their expertise, create lasting impacts, and be recognized as invaluable contributors to Africa's success story.
            </p>
        </div>
    </section>

    <section id="how-it-works" class="py-16">
        <div class="container mx-auto">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
                <div class="lg:w-1/2">
                    <h2 class="text-3xl font-semibold mb-4">How It Works</h2>
                    <p class="text-gray-700 leading-relaxed">
                        The Diasporan Connection Initiative operates on a simple yet powerful principle. We encourage professionals from the diaspora to engage with African corporate organizations during their visits to the continent. Through short-term volunteer opportunities, workshops, and collaborations, diasporans gain local work experience, create meaningful connections, and showcase their skills to potential employers.
                    </p>
                </div>
                <img src="images/how-it-works.jpg" alt="How It Works" class="w-full lg:w-1/2 mb-8 lg:mb-0 rounded-lg shadow-lg" />
            </div>
        </div>
    </section>

    <section id="benefits" class="bg-gray-100 py-16">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-semibold mb-4">Benefits</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-2">Mutual Learning</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Our initiative fosters knowledge exchange between diasporan professionals and African organizations, creating an environment of continuous learning and growth.
                    </p>
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-2">Skill Utilization</h3>
                    <p class="text-gray-700 leading-relaxed">
                        By participating in real projects and contributing their expertise, diasporans develop a portfolio of work that demonstrates their capabilities.
                    </p>
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-2">Seamless Transitions</h3>
                    <p class="text-gray-700 leading-relaxed">
                        As diasporans decide to relocate or return to Africa, their established working history helps them stand out to potential employers, ensuring a smoother transition into the workforce.
                    </p>
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-2">Cultural Exchange</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Beyond professional engagement, our initiative encourages cultural exchange, strengthening the diaspora's ties to their heritage.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="membership" class="py-16">
        <div class="container mx-auto">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:space-x-16">
                <img src="images/membership.jpg" alt="Membership and Partnerships" class="w-full lg:w-1/2 mb-8 lg:mb-0 rounded-lg shadow-lg" />
                <div class="lg:w-1/2">
                    <h2 class="text-3xl font-semibold mb-4">Membership and Partnerships</h2>
                    <p class="text-gray-700 leading-relaxed">
                        We welcome diasporan professionals from various industries to join our initiative. By becoming a member, you gain access to exclusive opportunities, networking events, and resources designed to support your journey. Additionally, we partner with forward-thinking African organizations that are eager to harness the skills of diasporan professionals to drive innovation and growth.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="get-involved" class="bg-gray-100 py-16">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-semibold mb-4">Get Involved</h2>
            <p class="text-gray-700 leading-relaxed">
                Are you a diasporan professional looking to make a meaningful impact? Are you an organization in Africa seeking fresh perspectives and expertise? Join us in building a bridge that transcends boundaries and propels Africa forward.
            </p>
        </div>
    </section>

    <section id="contact" class="py-16">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-semibold mb-4">Contact Us</h2>
            <p class="text-gray-700 leading-relaxed">
                Reach out to us today to learn more about how you can get involved, partner with us, or support our mission. Together, we can shape a brighter future for African diasporans and their home continent.
            </p>
        </div>
    </section>

    {/* <footer class="bg-indigo-900 text-white py-8">
        <div class="container mx-auto text-center">
            &copy; 2023 Diasporan Connection Initiative. All rights reserved.
        </div>
    </footer> */}
    <Footer/>
    </body>
  )
}

export default LDPCA