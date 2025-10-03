import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import User from '../model/User/User'
class GoogleConfig {

    public clientID=process.env.CLIENT_ID as string
    public clientSecret=process.env.CLIENT_SECRET as string
    public callbackURL=process.env.CALLBACK_URL as string

   async SetUpStrategy():Promise<void>{
                passport.use(new GoogleStrategy({
                    clientID:this.clientID,
                    clientSecret:this.clientSecret,
                    callbackURL:this.callbackURL
                },
                async(accessToken,refreshToken,profile,done)=>{
                    try{
                        let user= await User.findOne({
                            authProvider:'google',
                            providerId:profile.id,
                            email:profile.emails?.[0]?.value
                    })
                    if(!user){
                         user=await User.create({
                            authProvider:'google',
                            providerId:profile.id,     
                            email:profile.emails?.[0]?.value,
                            fullName:profile.displayName,
                            isVerified:true,
                            role:'user',
                            subscriptionDetails:{
                                plan:'free'
                            }   
                        }) }
                 if (!user.providerId || user.authProvider !== 'google') {
                    user.providerId = profile.id;
                    user.authProvider = 'google';
                    await user.save();
                                                            }
                    
                    done(null,user)
                }
                catch(err){
                    done(err as Error,false)
                }
                }))       
    }

}
export default GoogleConfig