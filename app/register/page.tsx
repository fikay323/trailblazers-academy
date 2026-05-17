"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, ClipboardList } from "lucide-react"
import { useForm, ValidationError } from '@formspree/react'

export default function RegisterPage() {
  const [state, handleSubmit] = useForm('mdornonj')
  
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    lastSchool: "",
    classCompleted: "",
    programmes: [] as string[],
    subjectCombination: "",
    classMode: "",
    referral: "",
  })

  const programmesList = [
    { id: "bece", label: "BECE" },
    { id: "waec", label: "WAEC" },
    { id: "neco", label: "NECO" },
    { id: "utme", label: "UTME" },
    { id: "putme", label: "PUTME" },
    { id: "jupeb", label: "JUPEB" },
    { id: "ijmb", label: "IJMB" },
  ]

  const handleProgrammeChange = (id: string) => {
    setFormData(prev => ({
      ...prev,
      programmes: prev.programmes.includes(id)
        ? prev.programmes.filter(p => p !== id)
        : [...prev.programmes, id]
    }))
  }

  if (state.succeeded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-primary animate-in zoom-in duration-300" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Registration Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for registering with Trailblazers Academy. Our admissions team will contact you shortly via the phone number provided.
          </p>
          <Button onClick={() => window.location.href = "/"} className="mt-4">
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Student Registration
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the academy of excellence. Please fill out the form below to begin your journey.
          </p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader className="text-primary rounded-t-xl">
            <div className="flex items-center gap-3 justify-center">
              <ClipboardList className="h-6 w-6" />
              <CardTitle className="text-2xl">Application Form</CardTitle>
            </div>
            <CardDescription className="text-primary text-center">
              Please provide accurate information for processing.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Hidden Inputs for Formspree to capture custom component values */}
              <input type="hidden" name="Gender" value={formData.gender} />
              <input type="hidden" name="Programmes" value={formData.programmes.join(', ')} />
              <input type="hidden" name="Class Mode" value={formData.classMode} />

              {/* Personal Information */}
              <div className="space-y-8">
                <h3 className="text-lg font-semibold border-b pb-2">1. Personal Information</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">1. Full Name</Label>
                    <Input
                      id="fullName"
                      name="Full Name"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <ValidationError prefix="Full Name" field="Full Name" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">2. Date of Birth (DD/MM/YYYY)</Label>
                    <Input
                      id="dob"
                      name="Date of Birth"
                      type="text"
                      required
                      placeholder="e.g. 15/05/2005"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                    <ValidationError prefix="Date of Birth" field="Date of Birth" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>3. Gender</Label>
                  <RadioGroup
                    onValueChange={(val) => setFormData({ ...formData, gender: val })}
                    className="flex gap-6"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">4. Phone Number (Student/Parent)</Label>
                    <Input
                      id="phone"
                      name="Phone Number"
                      type="tel"
                      required
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <ValidationError prefix="Phone Number" field="Phone Number" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">5. Email Address (Optional)</Label>
                    <Input
                      id="email"
                      name="Email Address"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <ValidationError prefix="Email Address" field="Email Address" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">6. Residential Address</Label>
                  <Input
                    id="address"
                    name="Residential Address"
                    required
                    placeholder="Enter your current address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <ValidationError prefix="Residential Address" field="Residential Address" errors={state.errors} className="text-sm text-red-500 mt-1" />
                </div>
              </div>

              {/* Academic History */}
              <div className="space-y-8 pt-4">
                <h3 className="text-lg font-semibold border-b pb-2">2. Academic Background</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lastSchool">7. Last School Attended</Label>
                    <Input
                      id="lastSchool"
                      name="Last School Attended"
                      required
                      placeholder="Name of your last school"
                      value={formData.lastSchool}
                      onChange={(e) => setFormData({ ...formData, lastSchool: e.target.value })}
                    />
                    <ValidationError prefix="Last School Attended" field="Last School Attended" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classCompleted">8. Class Completed</Label>
                    <Input
                      id="classCompleted"
                      name="Class Completed"
                      required
                      placeholder="e.g. SSS 3"
                      value={formData.classCompleted}
                      onChange={(e) => setFormData({ ...formData, classCompleted: e.target.value })}
                    />
                    <ValidationError prefix="Class Completed" field="Class Completed" errors={state.errors} className="text-sm text-red-500 mt-1" />
                  </div>
                </div>
              </div>

              {/* Programme Selection */}
              <div className="space-y-8 pt-4">
                <h3 className="text-lg font-semibold border-b pb-2">3. Programme Details</h3>
                <div className="space-y-4">
                  <Label>9. Programme Registering For (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {programmesList.map((prog) => (
                      <div key={prog.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={prog.id}
                          checked={formData.programmes.includes(prog.id)}
                          onCheckedChange={() => handleProgrammeChange(prog.id)}
                        />
                        <Label htmlFor={prog.id} className="cursor-pointer">{prog.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects">10. Subject Combination (for WAEC/UTME/JUPEB)</Label>
                  <Input
                    id="subjects"
                    name="Subject Combination"
                    placeholder="e.g. Maths, English, Physics, Chemistry"
                    value={formData.subjectCombination}
                    onChange={(e) => setFormData({ ...formData, subjectCombination: e.target.value })}
                  />
                  <ValidationError prefix="Subject Combination" field="Subject Combination" errors={state.errors} className="text-sm text-red-500 mt-1" />
                </div>

                <div className="space-y-3">
                  <Label>11. Preferred Class Mode</Label>
                  <RadioGroup
                    onValueChange={(val) => setFormData({ ...formData, classMode: val })}
                    className="flex flex-wrap gap-6"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical">Physical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referral">12. How Did You Hear About Us?</Label>
                  <Input
                    id="referral"
                    name="Referral"
                    placeholder="e.g. Social Media, Friend, Radio"
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                  />
                  <ValidationError prefix="Referral" field="Referral" errors={state.errors} className="text-sm text-red-500 mt-1" />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={state.submitting}
                  className="px-12 py-6 text-lg shadow-lg hover:shadow-primary/20 transition-all"
                >
                  {state.submitting ? "Submitting..." : "Submit Application"}
                  {!state.submitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need help? Contact us at admissions@trailblazers.edu or call (555) 123-4567
        </p>
      </div>
    </div>
  )
}
