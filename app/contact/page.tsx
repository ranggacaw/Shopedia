import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
    return (
        <>
        <Header />

        <div className="container mx-auto p-6">
            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We'd love to hear from you! Whether you have a question, feedback, or
                    just want to say hello, feel free to reach out.
                </p>
            </section>

            {/* Contact Form and Information Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
                {/* Contact Form */}
                <div className="card border border-base-300 shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                    <form className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea
                                placeholder="Enter your message"
                                className="textarea textarea-bordered w-full h-32"
                            />
                        </div>
                        <div className="form-control">
                            <button type="submit" className="btn btn-primary">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="card border border-base-300 shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <FaMapMarkerAlt className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Address</h3>
                                <p className="text-gray-600">East Bekasi, Indonesia</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <FaPhone className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Phone</h3>
                                <p className="text-gray-600">(021) 456-789-000</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <FaEnvelope className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Email</h3>
                                <p className="text-gray-600">info@shopedia.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
                <div className="card border border-base-300 shadow-sm p-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.284822038009!2d106.99850147499035!3d-6.226127593761956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71cf814d97%3A0xd22a5d56809f070a!2sSummarecon%20Mall%20Bekasi!5e0!3m2!1sen!2sid!4v1739678088020!5m2!1sen!2sid"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </section>
        </div>

        <Footer />
        </>
    );
};

export default ContactUs;