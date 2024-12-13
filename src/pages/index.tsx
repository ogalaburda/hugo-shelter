import Button from 'components/blocks/button';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    const handleAddPetClick = () => {
        router.push('/add-pet'); // Redirect to AddPetForm page
    };
    return (
        <>
            <div id="content">
                <div className="header">
                    <h1>Hello there</h1>
                    <div className="logo">
                        <img
                            src="https://user-images.githubusercontent.com/43764894/223559747-e9d7f19d-91bf-46a9-a0cb-8d6a40d3cfa3.png"
                            alt="netlify + hugo banner"
                            role="presentation"
                        />
                    </div>
                    <h2>Hi Hi Hi</h2>
                    <div className="bttns">
                        <a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/hugo-quickstart" className="bttn primary">
                            Deploy to Netlify
                        </a>
                        <a href="https://github.com/netlify-templates/hugo-quickstart" className="bttn secondary">
                            View Repo
                        </a>
                    </div>
                </div>
                <div className="resource-list">
                    <ul>
                        <li>
                            <a href="https://ntl.fyi/3xXydGk">Netlify Blog: Hugo posts</a>
                        </li>
                        <li>
                            <a href="https://ntl.fyi/3P9w1mr">Hugo on Netlify Docs</a>
                        </li>
                        <li>
                            <a href="https://gohugo.io/documentation/">Hugo Docs</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content">
                <div className="header">
                    <h1>Hello there</h1>
                    <div className="logo">
                        <img
                            src="https://user-images.githubusercontent.com/43764894/223559747-e9d7f19d-91bf-46a9-a0cb-8d6a40d3cfa3.png"
                            alt="netlify + hugo banner"
                            role="presentation"
                        />
                    </div>
                    <h2>Hi Hi Hi</h2>
                    <div className="bttns">
                        <a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/hugo-quickstart" className="bttn primary">
                            Deploy to Netlify
                        </a>
                        <a href="https://github.com/netlify-templates/hugo-quickstart" className="bttn secondary">
                            View Repo
                        </a>
                    </div>
                </div>
                <div className="resource-list">
                    <ul>
                        <li>
                            <a href="https://ntl.fyi/3xXydGk">Netlify Blog: Hugo posts</a>
                        </li>
                        <li>
                            <a href="https://ntl.fyi/3P9w1mr">Hugo on Netlify Docs</a>
                        </li>
                        <li>
                            <a href="https://gohugo.io/documentation/">Hugo Docs</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content">
                <div className="header">
                    <h1>Hello there</h1>
                    <div className="logo">
                        <img
                            src="https://user-images.githubusercontent.com/43764894/223559747-e9d7f19d-91bf-46a9-a0cb-8d6a40d3cfa3.png"
                            alt="netlify + hugo banner"
                            role="presentation"
                        />
                    </div>
                    <h2>Hi Hi Hi</h2>
                    <div className="bttns">
                        <a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/hugo-quickstart" className="bttn primary">
                            Deploy to Netlify
                        </a>
                        <a href="https://github.com/netlify-templates/hugo-quickstart" className="bttn secondary">
                            View Repo
                        </a>
                    </div>
                </div>
                <div className="resource-list">
                    <ul>
                        <li>
                            <a href="https://ntl.fyi/3xXydGk">Netlify Blog: Hugo posts</a>
                        </li>
                        <li>
                            <a href="https://ntl.fyi/3P9w1mr">Hugo on Netlify Docs</a>
                        </li>
                        <li>
                            <a href="https://gohugo.io/documentation/">Hugo Docs</a>
                        </li>
                    </ul>
                    {/* Bottom Buttons */}
                    <div className="flex justify-between">
                        <Button
                            label="Add Pet"
                            variant="primary"
                            onClick={handleAddPetClick} // Attach navigation handler
                        />
                        <div className="space-x-4"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
