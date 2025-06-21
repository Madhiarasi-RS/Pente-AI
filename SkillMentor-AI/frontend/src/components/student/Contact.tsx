
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/shared/Header';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    reason: '',
    email: '',
    contact: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    if (field === 'message' && value.length > 300) return;
    
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for contacting SkillMentor.AI! We will get back to you soon.');
    setFormData({ reason: '', email: '', contact: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="w-full h-48 md:h-60 lg:h-72 mb-6 relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <MessageSquare className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-4" />
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">Get in Touch</h1>
                <p className="text-lg md:text-xl opacity-90">We'd love to hear from you</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-700 mb-4">
              SkillMentor.AI
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Have feedback, questions, or need assistance? We're here to help you on your learning journey.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <Send className="h-6 w-6 text-indigo-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Reason Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-sm font-medium">
                      What can we help you with?
                    </Label>
                    <Select value={formData.reason} onValueChange={(value) => handleChange('reason', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">General Feedback</SelectItem>
                        <SelectItem value="course">Course-related Queries</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="contact"
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      maxLength={300}
                      required
                      className="w-full resize-none"
                    />
                    <div className="text-right text-sm text-gray-500">
                      {formData.message.length}/300 characters
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:skillmentor@gmail.com" 
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      skillmentor@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-blue-100 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-blue-100 text-sm">
                      123 Learning Street<br />
                      Education City, EC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a 
                    href="/faq" 
                    className="block text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    Frequently Asked Questions
                  </a>
                  <a 
                    href="/support" 
                    className="block text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    Technical Support
                  </a>
                  <a 
                    href="/courses" 
                    className="block text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    Browse Courses
                  </a>
                  <a 
                    href="https://linkedin.com/in/skillmentor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="shadow-xl border-0 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Quick Response</h3>
                  <p className="text-green-600 text-sm">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;